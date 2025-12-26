import { APP_DEFAULT_GUEST_PATHS } from '@/config'
import { MetadataRoute } from 'next'

export default function sitemap (): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || ''

  // Filter out any undefined or empty paths and ensure uniqueness
  const routes = [
    '/',
    ...APP_DEFAULT_GUEST_PATHS.filter((path): path is string => !!path),
    '/privacy-policy',
    '/terms-of-service'
  ]

  // Remove duplicates
  const uniqueRoutes = [...new Set(routes)]

  return uniqueRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8
  }))
}
