import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import puppeteer from 'puppeteer-core'

const require = createRequire(import.meta.url)
const handler = require('serve-handler')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const siteUrl = 'https://www.ssuker.co.kr'

const routes = [
  '/',
  '/company',
  '/products',
  '/products/premium',
  '/products/standard',
  '/products/premium/details',
  '/products/standard/details',
  '/counsel',
  '/contact',
  '/news',
  '/news/20250508-website-open',
  '/privacy',
  '/__prerender_404',
]

const chromeCandidates = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

async function resolveBrowserPath() {
  for (const candidate of chromeCandidates) {
    try {
      await fs.access(candidate)
      return candidate
    } catch {
      // try next
    }
  }
  throw new Error(
    'Chrome/Edge executable not found. Set PUPPETEER_EXECUTABLE_PATH to a Chromium-based browser.',
  )
}

function routeToFile(route) {
  if (route === '/__prerender_404') {
    return path.join(dist, '404.html')
  }
  if (route === '/') {
    return path.join(dist, 'index.html')
  }
  return path.join(dist, route.replace(/^\//, ''), 'index.html')
}

async function startServer() {
  const server = http.createServer((request, response) =>
    handler(request, response, {
      public: dist,
      cleanUrls: false,
      rewrites: [{ source: '**', destination: '/index.html' }],
    }),
  )

  await new Promise((resolve) => {
    server.listen(4179, '127.0.0.1', resolve)
  })

  return server
}

async function writeSitemap() {
  const urls = routes
    .filter((route) => route !== '/__prerender_404')
    .map(
      (route) => `  <url>
    <loc>${siteUrl}${route === '/' ? '/' : route}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
  await fs.writeFile(path.join(dist, 'sitemap.xml'), xml, 'utf8')
}

async function main() {
  const executablePath = await resolveBrowserPath()
  console.log(`prerender: using browser ${executablePath}`)

  const server = await startServer()
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900 })

    for (const route of routes) {
      const url = `http://127.0.0.1:4179${route}`
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
      await page.waitForSelector('#app', { timeout: 30000 })
      await page.evaluate(() => {
        document.querySelectorAll('[data-reveal]').forEach((el) => {
          el.classList.add('is-revealed')
        })
      })
      await new Promise((resolve) => setTimeout(resolve, 250))

      const html = await page.content()
      const outFile = routeToFile(route)
      await fs.mkdir(path.dirname(outFile), { recursive: true })
      await fs.writeFile(outFile, html, 'utf8')
      console.log(`prerender: ${route} -> ${path.relative(root, outFile)}`)
    }

    await writeSitemap()
    console.log('prerender: sitemap.xml ready')
  } finally {
    await browser.close()
    server.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
