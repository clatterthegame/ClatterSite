/**
 * Get the base URL for assets (works with GitHub Pages)
 */
export const getBaseUrl = () => {
  return import.meta.env.BASE_URL || '/'
}

/**
 * Get the full path for an asset
 */
export const getAssetPath = (path) => {
  const base = getBaseUrl()
  // Remove leading slash from path if base already has one
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${base}${cleanPath}`
}

