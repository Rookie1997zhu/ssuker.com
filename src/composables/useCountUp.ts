import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

type CountUpOptions = {
  /** Duration in ms. Default 900. */
  duration?: number
  /** Observe this element once to auto-start from 0 → to. */
  triggerRef?: Ref<HTMLElement | null>
  /** Final value shown before / without animation (for prerender). */
  initial?: number
}

/**
 * Animated number. Renders `initial`/`to` immediately for SSR/prerender,
 * then can animate 0 → to on first intersection, or from → to via start().
 */
export function useCountUp(to: number, options: CountUpOptions = {}) {
  const duration = options.duration ?? 900
  const prefersReducedMotion = useReducedMotion()
  const value = ref(options.initial ?? to)
  let frame = 0
  let io: IntersectionObserver | null = null
  let playedOnce = false

  function easeOutCubic(t: number) {
    return 1 - (1 - t) ** 3
  }

  function start(from: number, target: number) {
    if (frame) window.cancelAnimationFrame(frame)

    if (prefersReducedMotion.value) {
      value.value = target
      return
    }

    const begin = performance.now()
    const delta = target - from

    function tick(now: number) {
      const t = Math.min(1, (now - begin) / duration)
      value.value = Math.round(from + delta * easeOutCubic(t))
      if (t < 1) {
        frame = window.requestAnimationFrame(tick)
      } else {
        frame = 0
        value.value = target
      }
    }

    value.value = from
    frame = window.requestAnimationFrame(tick)
  }

  function playOnce() {
    if (playedOnce) return
    playedOnce = true
    start(0, to)
  }

  onMounted(() => {
    const trigger = options.triggerRef?.value
    if (!trigger) return

    if (prefersReducedMotion.value) {
      value.value = to
      playedOnce = true
      return
    }

    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          playOnce()
          io?.disconnect()
          io = null
        }
      },
      { threshold: 0.35 },
    )
    io.observe(trigger)
  })

  onUnmounted(() => {
    if (frame) window.cancelAnimationFrame(frame)
    io?.disconnect()
  })

  return { value, start, playOnce }
}
