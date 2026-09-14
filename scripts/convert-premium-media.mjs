import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'src', 'assets', 'images')

async function convertFolder(folder, prefix, maxWidth) {
  const dir = path.join(root, folder)
  const files = (await fs.readdir(dir))
    .filter((name) => /\.(png|jpe?g)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  const outputs = []
  for (let i = 0; i < files.length; i += 1) {
    const outName = `${prefix}_${String(i + 1).padStart(2, '0')}.webp`
    const input = path.join(dir, files[i])
    const output = path.join(outDir, outName)
    await sharp(input)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(output)
    outputs.push(outName)
    console.log(`${files[i]} -> ${outName}`)
  }
  return outputs
}

const detail = await convertFolder(
  'SSUKER_Forklift_Detail_Photos_11_images',
  'premium_detail',
  1400,
)
const scene = await convertFolder(
  'SSUKER_Forklift_Ivory_Original_Background_15_images',
  'premium_scene',
  1600,
)

console.log(`done detail=${detail.length} scene=${scene.length}`)
