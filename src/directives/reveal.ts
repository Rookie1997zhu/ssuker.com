import type { Directive } from 'vue'

const observed = new WeakMap<Element, IntersectionObserver>()

export const vReveal: Directive<HTMLElement, string | undefined> = {
  mounted(el, binding) {
    if (binding.value) {
      el.setAttribute('data-reveal', binding.value)
    } else if (!el.hasAttribute('data-reveal')) {
      el.setAttribute('data-reveal', '')
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-revealed')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    observed.set(el, observer)
  },
  unmounted(el) {
    observed.get(el)?.disconnect()
    observed.delete(el)
  },
}
