import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.resolve(__dirname, '..', 'dist')

async function main() {
  await fs.writeFile(path.join(dist, '.nojekyll'), '')
  console.log('postbuild: .nojekyll ready')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
