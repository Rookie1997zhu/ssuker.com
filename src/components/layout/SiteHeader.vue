<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { navItems, siteMeta } from '@/data/site'
import { assetUrl } from '@/utils/assets'

const route = useRoute()
const open = ref(false)
const scrolled = ref(false)

const logoSrc = computed(() => assetUrl('logoColor'))

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function closeMenu() {
  open.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled, 'is-open': open }">
    <div class="container site-header__inner">
      <RouterLink class="brand" to="/" @click="closeMenu">
        <img v-if="logoSrc" :src="logoSrc" :alt="siteMeta.brand" class="brand__logo" />
        <span v-else class="brand__text display">{{ siteMeta.brand }}</span>
        <span class="brand__tag">{{ siteMeta.tagline }}</span>
      </RouterLink>

      <nav class="nav" aria-label="주 메뉴">
        <ul class="nav__list">
          <li
            v-for="item in navItems"
            :key="item.label"
            class="nav__item"
            :class="{ 'has-children': 'children' in item }"
          >
            <RouterLink
              :to="item.to"
              class="nav__link"
              :class="{ 'is-active': route.path === item.to || route.path.startsWith(`${item.to}/`) }"
            >
              {{ item.label }}
            </RouterLink>
            <ul v-if="'children' in item" class="nav__sub">
              <li class="nav__sub-panel">
                <ul>
                  <li v-for="child in item.children" :key="child.to">
                    <RouterLink :to="child.to">{{ child.label }}</RouterLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <a class="phone" :href="`tel:${siteMeta.phone}`">{{ siteMeta.phone }}</a>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        @click="open = !open"
      >
        <span />
        <span />
        <span />
        <span class="sr-only">메뉴</span>
      </button>
    </div>

    <div id="mobile-nav" class="mobile-nav" :class="{ 'is-open': open }">
      <ul>
        <li v-for="item in navItems" :key="`m-${item.label}`">
          <RouterLink :to="item.to" @click="closeMenu">{{ item.label }}</RouterLink>
          <ul v-if="'children' in item" class="mobile-nav__sub">
            <li v-for="child in item.children" :key="`m-${child.to}`">
              <RouterLink :to="child.to" @click="closeMenu">{{ child.label }}</RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--header-h);
  border-bottom: 1px solid transparent;
  background: transparent;
  transition:
    background var(--duration) var(--ease-out),
    border-color var(--duration) var(--ease-out),
    backdrop-filter var(--duration) var(--ease-out);
}

.site-header.is-scrolled,
.site-header.is-open {
  background: rgba(255, 255, 255, 0.92);
  border-bottom-color: var(--line);
  backdrop-filter: blur(10px);
}

.site-header__inner {
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: var(--space-5);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.brand__logo {
  height: 28px;
  width: auto;
}

.brand__text {
  font-size: 1.25rem;
  letter-spacing: 0.08em;
}

.brand__tag {
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 0.08em;
}

.nav__list {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.nav__item {
  position: relative;
}

.nav__link {
  display: inline-flex;
  padding-block: 0.5rem;
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--text-secondary);
}

.nav__link:hover,
.nav__link.is-active {
  color: var(--color-navy);
}

.nav__sub {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 15rem;
  padding: 0.75rem 0 0;
  background: transparent;
  border: none;
  box-shadow: none;
  opacity: 0;
  pointer-events: none;
  transform: translateY(6px);
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
  transition-delay: 150ms;
}

.nav__sub::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0.75rem;
}

.nav__sub-panel {
  padding: 0.65rem;
  background: var(--bg-elevated);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
}

.nav__sub-panel ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav__item.has-children:hover .nav__sub,
.nav__item.has-children:focus-within .nav__sub {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
  transition-delay: 0s;
}

.nav__sub a {
  display: block;
  padding: 0.65rem 0.75rem;
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.nav__sub a:hover {
  color: var(--accent-strong);
  background: rgba(0, 131, 167, 0.08);
}

.phone {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--accent-strong);
}

.menu-toggle {
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  gap: 5px;
}

.menu-toggle span:not(.sr-only) {
  display: block;
  width: 1.25rem;
  height: 1.5px;
  background: var(--color-ink);
}

.mobile-nav {
  display: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 960px) {
  .nav,
  .phone {
    display: none;
  }

  .site-header__inner {
    grid-template-columns: 1fr auto;
  }

  .menu-toggle {
    display: grid;
  }

  .mobile-nav {
    display: block;
    position: absolute;
    inset: var(--header-h) 0 auto;
    padding: var(--space-5) 1.25rem var(--space-6);
    background: rgba(255, 255, 255, 0.98);
    border-bottom: 1px solid var(--line);
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity var(--duration) var(--ease-out),
      transform var(--duration) var(--ease-out);
  }

  .mobile-nav.is-open {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .mobile-nav a {
    display: block;
    padding: 0.85rem 0;
    font-family: var(--font-display);
    letter-spacing: 0.08em;
    border-bottom: 1px solid var(--line);
  }

  .mobile-nav__sub {
    padding-left: 0.75rem;
  }

  .mobile-nav__sub a {
    font-size: var(--text-sm);
    color: var(--text-muted);
    letter-spacing: 0;
  }
}
</style>
