import type { Directive, DirectiveBinding } from 'vue'

export type RevealBinding =
  | string
  | {
      dir?: 'left' | 'right' | ''
      delay?: number
    }
  | undefined

const observed = new WeakMap<Element, IntersectionObserver>()

function applyBinding(el: HTMLElement, value: RevealBinding) {
  if (value && typeof value === 'object') {
    const dir = value.dir ?? ''
    el.setAttribute('data-reveal', dir)
    if (typeof value.delay === 'number' && value.delay > 0) {
      el.style.transitionDelay = `${value.delay}ms`
    } else {
      el.style.transitionDelay = ''
    }
    return
  }

  if (typeof value === 'string' && value) {
    el.setAttribute('data-reveal', value)
  } else if (!el.hasAttribute('data-reveal')) {
    el.setAttribute('data-reveal', '')
  }
}

function clearDelay(el: HTMLElement) {
  el.style.transitionDelay = ''
}

export const vReveal: Directive<HTMLElement, RevealBinding> = {
  mounted(el, binding: DirectiveBinding<RevealBinding>) {
    applyBinding(el, binding.value)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      clearDelay(el)
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
  updated(el, binding: DirectiveBinding<RevealBinding>) {
    applyBinding(el, binding.value)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      clearDelay(el)
      el.classList.add('is-revealed')
    }
  },
  unmounted(el) {
    observed.get(el)?.disconnect()
    observed.delete(el)
  },
}
