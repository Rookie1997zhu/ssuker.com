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
  path.join('1.5TON-3TON 보급형', 'SSUKER_Forklift_Detail_Batch2_12_images'),
  'standard_detail',
  1400,
)
const scene = await convertFolder(
  path.join('1.5TON-3TON 보급형', 'SSUKER_Forklift_Logo_Original_Color_6_images'),
  'standard_scene',
  1600,
)

console.log(`done detail=${detail.length} scene=${scene.length}`)
