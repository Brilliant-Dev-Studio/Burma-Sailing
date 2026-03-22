/** Production site URL — used for canonical & Open Graph */
export const SITE_URL = 'https://www.burmasailing.info'

/** Default share image — social preview (Open Graph / Twitter); public/favicon.png */
export const SITE_OG_IMAGE = `${SITE_URL}/favicon.png`

/**
 * Canonical URL for a path (e.g. "/about" → https://www.burmasailing.info/about)
 */
export function canonicalUrl(path: string): string {
  if (!path || path === '/') return `${SITE_URL}/`
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${p}`
}
