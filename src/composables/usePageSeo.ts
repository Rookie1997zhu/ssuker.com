import { organizationJsonLd, resolveSeo, type PageSeo } from '@/data/seo'
import { siteMeta } from '@/data/site'

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attributes).forEach(([key, value]) => {
    el?.setAttribute(key, value)
  })
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id: string, data: Record<string, unknown> | Record<string, unknown>[]) {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function applyVerificationMetas() {
  const google = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION
  const naver = import.meta.env.VITE_NAVER_SITE_VERIFICATION

  if (google) {
    upsertMeta('meta[name="google-site-verification"]', {
      name: 'google-site-verification',
      content: google,
    })
  }
  if (naver) {
    upsertMeta('meta[name="naver-site-verification"]', {
      name: 'naver-site-verification',
      content: naver,
    })
  }
}

export function applyPageSeo(path: string, override?: Partial<PageSeo>) {
  const seo = { ...resolveSeo(path), ...override }
  const canonical = `${siteMeta.siteUrl}${path === '/' ? '/' : path}`
  const ogImage = seo.ogImage ?? defaultOg()

  document.title = seo.title

  upsertMeta('meta[name="description"]', {
    name: 'description',
    content: seo.description,
  })
  upsertLink('canonical', canonical)

  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
  upsertMeta('meta[property="og:site_name"]', {
    property: 'og:site_name',
    content: siteMeta.brand,
  })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title })
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: seo.description,
  })
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage })

  upsertMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary_large_image',
  })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title })
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: seo.description,
  })
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage })

  applyVerificationMetas()

  const payloads: Record<string, unknown>[] = [organizationJsonLd()]
  if (seo.jsonLd) {
    if (Array.isArray(seo.jsonLd)) {
      payloads.push(...seo.jsonLd)
    } else {
      payloads.push(seo.jsonLd)
    }
  }
  upsertJsonLd('ssuker-jsonld', payloads)
}

function defaultOg() {
  return `${siteMeta.siteUrl}/og-default.png`
}
