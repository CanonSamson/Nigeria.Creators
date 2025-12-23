import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type TikTokOEmbedResponse = {
  version: string
  type: string
  title: string
  author_url: string
  author_name: string
  width: number | string
  height: number | string
  html: string
  thumbnail_width?: number
  thumbnail_height?: number
  thumbnail_url?: string
  provider_url?: string
  provider_name?: string
  author_unique_id?: string
  embed_product_id?: string
  embed_type?: string
}

const buildEndpoint = (url: string) =>
  `https://www.tiktok.com/oembed?url=${url}`

const toEmbedUrl = (url: string): string | null => {
  if (!url) return null
  try {
    const u = new URL(url)
    if (!u.hostname.toLowerCase().includes('tiktok.com')) return null
    const m = url.match(/\/video\/(\d+)/)
    const id = m?.[1]
    if (id) return `https://www.tiktok.com/embed/v2/video/${id}`
    return null
  } catch {
    return null
  }
}

export const useTikTokOEmbed = (initialUrl?: string) => {
  const [url, setUrl] = useState<string | undefined>(initialUrl)

  const { data, isLoading, error, refetch } = useQuery<TikTokOEmbedResponse>({
    queryKey: ['tiktok-oembed', url],
    enabled: !!url,
    queryFn: async ({ signal }) => {
      const res = await axios.get<TikTokOEmbedResponse>(
        buildEndpoint(url as string),
        {
          signal,
          headers: { Accept: 'application/json' }
        }
      )
      return res.data as TikTokOEmbedResponse
    }
  })

  const embedUrl = useMemo(
    () =>
      data?.embed_product_id
        ? `https://www.tiktok.com/@${data?.author_unique_id}/video/${data?.embed_product_id}`
        : null,
    [data?.embed_product_id, data?.author_unique_id]
  )

  return {
    loading: isLoading,
    error: error ? (error as Error).message : null,
    url,
    setUrl: (nextUrl?: string) => setUrl(nextUrl),
    reload: () => refetch(),
    embedUrl,
    type: data?.embed_type ?? null,
    clear: () => setUrl(undefined)
  }
}
