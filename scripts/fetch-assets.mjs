import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'src', 'assets', 'images')
const cacheDir = path.join(root, 'scripts', '.cache')

const assets = [
  { url: 'https://www.ssuker.com/images/logo_white.png', out: 'logo_white.webp', maxWidth: 480 },
  { url: 'https://www.ssuker.com/images/logo_color.png', out: 'logo_color.webp', maxWidth: 480 },
  {
    url: 'https://www.ssuker.com/images/main/content01_01_bg.png',
    out: 'hero_01.webp',
    maxWidth: 1920,
  },
  {
    url: 'https://www.ssuker.com/images/main/content01_02_bg.png',
    out: 'hero_02.webp',
    maxWidth: 1920,
  },
  {
    url: 'https://www.ssuker.com/images/main/content01_03_bg.png',
    out: 'hero_03.webp',
    maxWidth: 1920,
  },
  {
    url: 'https://www.ssuker.com/images/main/content02_bg.png',
    out: 'about_bg.webp',
    maxWidth: 1600,
  },
  {
    url: 'https://www.ssuker.com/images/sub/company/company_about_img01.png',
    out: 'company_about.webp',
    maxWidth: 1400,
  },
  {
    url: 'https://www.ssuker.com/images/main/content03_item01.png',
    out: 'machine_01.webp',
    maxWidth: 900,
  },
  {
    url: 'https://www.ssuker.com/images/main/content03_item02.png',
    out: 'machine_02.webp',
    maxWidth: 900,
  },
  {
    url: 'https://www.ssuker.com/images/main/content03_item03.png',
    out: 'machine_03.webp',
    maxWidth: 900,
  },
  {
    url: 'https://www.ssuker.com/images/main/customer_bg.png',
    out: 'warranty_bg.webp',
    maxWidth: 1600,
  },
  {
    url: 'https://www.ssuker.com/images/main/customer_bg.png',
    out: 'customer_bg.webp',
    maxWidth: 1600,
  },
  {
    url: 'https://www.ssuker.com/images/sub/customer/customer_su_img01.png',
    out: 'thumb_standard.webp',
    maxWidth: 900,
  },
  {
    url: 'https://www.ssuker.com/images/sub/customer/customer_su_img02.png',
    out: 'thumb_premium.webp',
    maxWidth: 900,
  },
  {
    url: 'https://www.ssuker.com/images/sub/customer/front_ssuker.png',
    out: 'standard_front.webp',
    maxWidth: 1200,
  },
  {
    url: 'https://www.ssuker.com/images/sub/customer/side_ssuker.png',
    out: 'standard_side.webp',
    maxWidth: 1200,
  },
  {
    url: 'https://www.ssuker.com/images/sub/customer/back_ssuker.png',
    out: 'standard_back.webp',
    maxWidth: 1200,
  },
  {
    url: 'https://www.ssuker.com/images/sub/customer/front_advanced.png',
    out: 'premium_front.webp',
    maxWidth: 1200,
  },
  {
    url: 'https://www.ssuker.com/images/sub/customer/side_advanced.png',
    out: 'premium_side.webp',
    maxWidth: 1200,
  },
  {
    url: 'https://www.ssuker.com/images/sub/customer/back_advanced.png',
    out: 'premium_back.webp',
    maxWidth: 1200,
  },
  {
    url: 'https://www.ssuker.com/images/sub/customer/sideshift_ssuker.png',
    out: 'sideshift.webp',
    maxWidth: 1000,
  },
  {
    url: 'https://www.ssuker.com/images/main/content04_bg_01.png',
    out: 'news_card_01.webp',
    maxWidth: 900,
  },
  {
    url: 'https://www.ssuker.com/images/main/content04_bg_02.png',
    out: 'news_card_02.webp',
    maxWidth: 900,
  },
  {
    url: 'https://www.ssuker.com/images/main/content04_bg_03.png',
    out: 'news_card_03.webp',
    maxWidth: 900,
  },
  {
    url: 'https://www.ssuker.com/images/main/content04_bg_04.png',
    out: 'news_card_04.webp',
    maxWidth: 900,
  },
]

async function ensureDirs() {
  await fs.mkdir(outDir, { recursive: true })
  await fs.mkdir(cacheDir, { recursive: true })
}

async function download(url, dest) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed ${response.status} ${url}`)
  }
  const buffer = Buffer.from(await response.arrayBuffer())
  await fs.writeFile(dest, buffer)
  return buffer
}

async function convertOne(asset) {
  const cachePath = path.join(cacheDir, path.basename(new URL(asset.url).pathname))
  const outPath = path.join(outDir, asset.out)

  let buffer
  try {
    buffer = await fs.readFile(cachePath)
  } catch {
    console.log(`download ${asset.url}`)
    buffer = await download(asset.url, cachePath)
  }

  await sharp(buffer)
    .resize({ width: asset.maxWidth, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(outPath)

  const stat = await fs.stat(outPath)
  console.log(`ok ${asset.out} (${Math.round(stat.size / 1024)}KB)`)
}

async function main() {
  await ensureDirs()
  for (const asset of assets) {
    await convertOne(asset)
  }

  // favicon from color logo
  const logoCache = path.join(cacheDir, 'logo_color.png')
  const faviconOut = path.join(root, 'public', 'favicon.png')
  await fs.mkdir(path.join(root, 'public'), { recursive: true })
  await sharp(await fs.readFile(logoCache))
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(faviconOut)

  console.log('done')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
