import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const imagesDir = path.join(root, 'src', 'assets', 'images')
const THRESHOLD = 120 * 1024

const files = fs
  .readdirSync(imagesDir)
  .filter((name) => name.toLowerCase().endsWith('.webp') && !name.endsWith('.tmp'))
  .sort()

let saved = 0
let touched = 0

for (const name of files) {
  const filePath = path.join(imagesDir, name)
  let before
  try {
    before = fs.statSync(filePath).size
  } catch (error) {
    console.warn(`skip ${name}: cannot stat`, error.message)
    continue
  }
  if (before <= THRESHOLD) continue

  const tempPath = `${filePath}.opt.webp`
  try {
    await sharp(filePath).webp({ quality: 72, effort: 6 }).toFile(tempPath)
    const after = fs.statSync(tempPath).size
    if (after >= before) {
      fs.unlinkSync(tempPath)
      console.log(`skip ${name}: ${before} -> ${after}`)
      continue
    }

    try {
      fs.unlinkSync(filePath)
    } catch {
      // Fall through to replace via copy if unlink fails.
    }

    try {
      fs.renameSync(tempPath, filePath)
    } catch {
      fs.copyFileSync(tempPath, filePath)
      fs.unlinkSync(tempPath)
    }

    touched += 1
    saved += before - after
    console.log(`ok ${name}: ${before} -> ${after}`)
  } catch (error) {
    try {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath)
    } catch {
      /* ignore */
    }
    console.warn(`skip ${name}:`, error.message)
  }
}

for (const leftover of fs.readdirSync(imagesDir).filter((n) => n.endsWith('.tmp') || n.endsWith('.opt.webp'))) {
  try {
    fs.unlinkSync(path.join(imagesDir, leftover))
  } catch {
    /* ignore */
  }
}

console.log(`Optimized ${touched} files, saved ${saved} bytes`)
