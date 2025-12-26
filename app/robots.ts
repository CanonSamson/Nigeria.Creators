import { APP_DEFAULT_AUTH_PATHS } from '@/config'
import { MetadataRoute } from 'next'

export default function robots (): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || ''
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...APP_DEFAULT_AUTH_PATHS, '/api/']
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [...APP_DEFAULT_AUTH_PATHS, '/api/']
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
