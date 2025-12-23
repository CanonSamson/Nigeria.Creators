'use client'
import { TikTokEmbed } from 'react-social-media-embed'
import { useTikTokOEmbed } from '@/hooks/useTikTokOEmbed'

const CustomTikTokEmbed = ({ url }: { url: string }) => {
  const { embedUrl, loading } = useTikTokOEmbed(url)
  if (loading) return <div />

  return <TikTokEmbed url={embedUrl || url} width={'100%'} />
}

export default CustomTikTokEmbed
