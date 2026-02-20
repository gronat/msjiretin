import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://msjiretin.cz'

  const staticPages: MetadataRoute.Sitemap = [
    { 
      url: baseUrl, 
      lastModified: new Date(), 
      changeFrequency: 'weekly', 
      priority: 1.0 
    },
    { 
      url: `${baseUrl}/o-nas`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.9 
    },
    { 
      url: `${baseUrl}/aktuality`, 
      lastModified: new Date(), 
      changeFrequency: 'weekly', 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/pro-rodice`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/galerie`, 
      lastModified: new Date(), 
      changeFrequency: 'weekly', 
      priority: 0.7 
    },
    { 
      url: `${baseUrl}/dokumenty`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.7 
    },
    { 
      url: `${baseUrl}/kontakt`, 
      lastModified: new Date(), 
      changeFrequency: 'yearly', 
      priority: 0.6 
    },
  ]

  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/aktuality/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const albums = await prisma.album.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const albumPages: MetadataRoute.Sitemap = albums.map((album) => ({
    url: `${baseUrl}/galerie/${album.slug}`,
    lastModified: album.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticPages, ...postPages, ...albumPages]
}
