import { imageKeys, type ImageKey } from '@/data/site'
import { imageDimensions, type ImageDimension } from '@/data/imageDimensions'

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

export function imageFileSize(filename: string): ImageDimension | undefined {
  return imageDimensions[filename]
}

export function assetSize(key: ImageKey): ImageDimension | undefined {
  return imageFileSize(imageKeys[key])
}
