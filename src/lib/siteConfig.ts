/** Production site URL — used for canonical & Open Graph */
export const SITE_URL = 'https://www.burmasailing.online'

/** Default share image (absolute URL) */
export const SITE_OG_IMAGE = `${SITE_URL}/IMG_2675.JPG`

/**
 * Canonical URL for a path (e.g. "/about" → https://www.burmasailing.online/about)
 */
export function canonicalUrl(path: string): string {
  if (!path || path === '/') return `${SITE_URL}/`
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${p}`
}
