import { imageKeys, type ImageKey } from '@/data/site'

const modules = import.meta.glob('../assets/images/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolveByFilename(filename: string): string {
  const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${filename}`))
  return entry?.[1] ?? ''
}

export function assetUrl(key: ImageKey): string {
  return resolveByFilename(imageKeys[key])
}

export function imageFileUrl(filename: string): string {
  return resolveByFilename(filename)
}
