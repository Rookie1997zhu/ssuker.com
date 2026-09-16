import { onMounted, onUnmounted, watch, type Ref } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

type ParallaxOptions = {
  /** Max translate in px (absolute). Default 60. */
  amplitude?: number
  /** Only enable at min-width. Default 900. */
  minWidth?: number
}

/**
 * Writes --parallax-y on the target element while it is in view.
 * Desktop-only; disabled under prefers-reduced-motion.
 */
export function useParallax(targetRef: Ref<HTMLElement | null>, options: ParallaxOptions = {}) {
  const amplitude = options.amplitude ?? 60
  const minWidth = options.minWidth ?? 900
  const prefersReducedMotion = useReducedMotion()

  let frame = 0
  let desktopQuery: MediaQueryList | null = null
  let io: IntersectionObserver | null = null
  let inView = false
  let observedEl: HTMLElement | null = null

  function apply() {
    frame = 0
    const el = targetRef.value
    if (!el) return

    if (prefersReducedMotion.value || !desktopQuery?.matches || !inView) {
      el.style.setProperty('--parallax-y', '0px')
      return
    }

    const rect = el.getBoundingClientRect()
    const viewH = window.innerHeight || 1
    const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH
    const offset = Math.max(-amplitude, Math.min(amplitude, progress * amplitude * 2))
    el.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`)
  }

  function schedule() {
    if (frame) return
    frame = window.requestAnimationFrame(apply)
  }

  function onScroll() {
    schedule()
  }

  function bindTarget(el: HTMLElement | null) {
    if (observedEl && io) io.unobserve(observedEl)
    observedEl = el
    inView = false
    if (el && io) io.observe(el)
    schedule()
  }

  onMounted(() => {
    desktopQuery = window.matchMedia(`(min-width: ${minWidth}px)`)
    desktopQuery.addEventListener('change', schedule)

    io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting)
        schedule()
      },
      { threshold: 0, rootMargin: '10% 0px' },
    )

    bindTarget(targetRef.value)
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  watch(targetRef, (el) => {
    bindTarget(el)
  })

  onUnmounted(() => {
    if (frame) window.cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    desktopQuery?.removeEventListener('change', schedule)
    io?.disconnect()
  })
}
