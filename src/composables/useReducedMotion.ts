import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useReducedMotion(): Ref<boolean> {
  const prefersReducedMotion = ref(false)
  let query: MediaQueryList | null = null

  function sync() {
    prefersReducedMotion.value = Boolean(query?.matches)
  }

  function onChange(event: MediaQueryListEvent) {
    prefersReducedMotion.value = event.matches
  }

  onMounted(() => {
    query = window.matchMedia('(prefers-reduced-motion: reduce)')
    sync()
    query.addEventListener('change', onChange)
  })

  onUnmounted(() => {
    query?.removeEventListener('change', onChange)
  })

  return prefersReducedMotion
}
