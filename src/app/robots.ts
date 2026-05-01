import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/courses/', '/api/', '/settings/'],
    },
    sitemap: 'https://devnekoacademy.com/sitemap.xml',
  }
}
