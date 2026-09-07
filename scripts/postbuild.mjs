import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.resolve(__dirname, '..', 'dist')

async function main() {
  const indexPath = path.join(dist, 'index.html')
  await fs.copyFile(indexPath, path.join(dist, '404.html'))
  await fs.writeFile(path.join(dist, '.nojekyll'), '')
  console.log('postbuild: 404.html and .nojekyll ready')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
