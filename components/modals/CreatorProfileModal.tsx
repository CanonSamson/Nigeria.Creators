'use client'

import { useSettingModal } from '@/context/model-settings'
import React from 'react'
import Image from 'next/image'
import { BsInstagram } from 'react-icons/bs'
import { SiTiktok } from 'react-icons/si'
import { RxCross2 } from 'react-icons/rx'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import {
  InstagramEmbed,
  YouTubeEmbed
} from 'react-social-media-embed'
import { resolveEmbedUrl } from '@/utils/func/resolveEmbedUrl'
import CustomTikTokEmbed from '../embed/CustomTikTokEmbed'
import { getPlatform } from '@/utils/func'

const CreatorProfileModal = () => {
  const { toggleModal, modals, modalData } = useSettingModal()

  const isOpen = modals?.creatorProfileModal
  const values = modalData?.creatorProfileModal
  const userId = modalData?.creatorProfileModal?.userId || undefined

  const { data: creatorData, isLoading } = useQuery<{
    success: boolean
    data?: any
    error?: string
  }>({
    queryKey: ['creator-details', userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await fetch(`/api/creators/${userId}`)
      return res.json()
    }
  })




  const mergedData =
    creatorData?.success && creatorData?.data ? creatorData.data : null

  const data = {
    name: mergedData?.name ?? values?.name ?? '',
    avatar: mergedData?.profilePictureUrl ?? values?.avatar ?? '',
    about: mergedData?.profile?.description ?? values?.about ?? '',
    links: {
      contentLink:
        mergedData?.profile?.contentLink ?? values?.contentLink ?? '',
      instagram: mergedData?.profile?.instagramLink ?? values?.instagram ?? '',
      tiktok: mergedData?.profile?.tiktokLink ?? values?.tiktok ?? ''
    },
    work: Array.isArray(values?.work) ? values.work : []
  }



  const handleClose = () => {
    toggleModal('creatorProfileModal')
  }

  if (!isOpen) return null
  return (
    <div
      className={cn(
        `fixed  top-0 right-0  w-full h-screen  z-50 items-end lg:items-center justify-center`,
        '!h-[100dvh]',
        isOpen ? 'flex' : 'hidden'
      )}
    >
      <div
        className='fixed inset-0 bg-black opacity-50'
        onClick={handleClose}
      />

      <div className='bg-white font-sans hide-scrollbar overflow-y-auto rounded-b-[0px] lg:rounded-b-[16px] rounded-[16px] shadow-lg max-h-[80vh] w-full lg:max-w-[640px] overflow-hidden z-10 flex flex-col'>
        <div className='relative w-full h-auto'>
          {isLoading ? (
            <div className='w-full h-[240px] md:h-[300px] bg-[#F1F1F1] animate-pulse' />
          ) : Boolean(data.avatar) ? (
            <Image
              src={data.avatar}
              alt={data.name || 'Creator avatar'}
              height={600}
              width={1000}
              className='w-full h-[240px] object-top md:h-[340px] object-cover'
            />
          ) : null}
          <button
            onClick={handleClose}
            aria-label='Close'
            className='absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 text-black flex items-center justify-center hover:bg-white'
          >
            <RxCross2 className='h-4 w-4' />
          </button>
        </div>

        <div className='px-5 pb-6'>
          {isLoading ? (
            <CreatorProfileSkeleton />
          ) : (
            <>
              {Boolean(data.name) ? (
                <div className='mt-4'>
                  <h2 className='text-[20px] md:text-[24px] font-bold text-black tracking-tighter'>
                    {data.name}
                  </h2>
                </div>
              ) : null}
              <div className='mt-3 flex items-center gap-2'>
                {Boolean(data.links.instagram) ? (
                  <a
                    href={data.links.instagram}
                    target='_blank'
                    rel='noreferrer'
                    aria-label='Instagram'
                    className='inline-flex items-center justify-center h-9 w-9 rounded-[10px] bg-[#F1F1F1] border border-[#EFEFEF] hover:opacity-80 transition-all'
                  >
                    <BsInstagram className='h-4 w-4' />
                  </a>
                ) : null}
                {Boolean(data.links.tiktok) ? (
                  <a
                    href={data.links.tiktok}
                    target='_blank'
                    rel='noreferrer'
                    aria-label='TikTok'
                    className='inline-flex items-center justify-center h-9 w-9 rounded-[10px] bg-[#F1F1F1] border border-[#EFEFEF] hover:opacity-80 transition-all'
                  >
                    <SiTiktok className='h-4 w-4' />
                  </a>
                ) : null}
              </div>
              <div className='my-4 border-t border-[#EFEFEF]' />
              {Boolean(data.about) ? (
                <div>
                  <h3 className='text-[16px] md:text-[18px] font-semibold text-black'>
                    About
                  </h3>
                  <p className='mt-2 text-[#40444C] tracking-tight text-[14px] md:text-[16px]'>
                    {data.about}
                  </p>
                </div>
              ) : null}

          
              {Boolean(data.links.contentLink) ? (
                <div className='mt-6'>
                  {getPlatform(data.links.contentLink) === 'tiktok' ? (
                    <CustomTikTokEmbed url={data.links.contentLink} />
                  ) : getPlatform(data.links.contentLink) === 'instagram' ? (
                    <InstagramEmbed
                      url={data.links.contentLink}
                      width={'100%'}
                    />
                  ) : getPlatform(data.links.contentLink) === 'youtube' ? (
                    <YouTubeEmbed url={data.links.contentLink} width={'100%'} />
                  ) : (
                    <iframe
                      src={resolveEmbedUrl(data.links.contentLink) || ''}
                      width='100%'
                      height='800'
                      allow='encrypted-media; picture-in-picture; fullscreen'
                      allowFullScreen
                      frameBorder='0'
                      className='rounded-[12px] w-full'
                    />
                  )}
                </div>
              ) : null}
            </>
          )}
          <div></div>
        </div>
      </div>
    </div>
  )
}

function CreatorProfileSkeleton () {
  return (
    <>
      <div className='mt-4 h-6 w-[200px] bg-[#F1F1F1] animate-pulse rounded' />
      <div className='mt-3 flex items-center gap-2'>
        <div className='h-9 w-9 rounded-[10px] bg-[#F1F1F1] border border-[#EFEFEF] animate-pulse' />
        <div className='h-9 w-9 rounded-[10px] bg-[#F1F1F1] border border-[#EFEFEF] animate-pulse' />
        <div className='h-9 w-9 rounded-[10px] bg-[#F1F1F1] border border-[#EFEFEF] animate-pulse' />
      </div>
      <div className='my-4 border-t border-[#EFEFEF]' />
      <div>
        <div className='h-5 w-[140px] bg-[#F1F1F1] animate-pulse rounded' />
        <div className='mt-3 space-y-2'>
          <div className='h-4 w-full bg-[#F1F1F1] animate-pulse rounded' />
          <div className='h-4 w-3/4 bg-[#F1F1F1] animate-pulse rounded' />
          <div className='h-4 w-2/4 bg-[#F1F1F1] animate-pulse rounded' />
        </div>
      </div>
      <div className='mt-6'>
        <div className='h-5 w-[120px] bg-[#F1F1F1] animate-pulse rounded' />
        <div className='mt-3 space-y-4'>
          <div className='bg-[#F1F1F1] rounded-[16px] p-3'>
            <div className='h-[360px] w-full bg-[#EDEDED] animate-pulse rounded-[12px]' />
          </div>
          <div className='bg-[#F1F1F1] rounded-[16px] p-3'>
            <div className='h-[360px] w-full bg-[#EDEDED] animate-pulse rounded-[12px]' />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatorProfileModal
