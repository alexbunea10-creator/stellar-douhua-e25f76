/**
 * Build a Netlify Image CDN URL so pages never ship full-resolution originals.
 * See: https://docs.netlify.com/image-cdn/overview/
 */
export function img(
  url: string,
  options: {
    w: number
    h?: number
    fit?: 'contain' | 'cover' | 'fill'
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right'
    q?: number
    fm?: 'webp' | 'avif' | 'jpg'
  },
) {
  const params = new URLSearchParams({ url, w: String(options.w) })
  if (options.h) params.set('h', String(options.h))
  if (options.fit) params.set('fit', options.fit)
  if (options.position) params.set('position', options.position)
  params.set('q', String(options.q ?? 72))
  params.set('fm', options.fm ?? 'webp')
  return `/.netlify/images?${params.toString()}`
}

/** srcSet across common breakpoints for a fixed aspect ratio. */
export function imgSet(
  url: string,
  widths: number[],
  ratio?: number,
  position?: 'center' | 'top' | 'bottom',
) {
  return widths
    .map((w) => {
      const h = ratio ? Math.round(w / ratio) : undefined
      return `${img(url, { w, h, fit: h ? 'cover' : undefined, position })} ${w}w`
    })
    .join(', ')
}
