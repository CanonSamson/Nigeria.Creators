'use client'

import { useFormikContext } from 'formik'
import BasicInput from '@/components/input/BasicInput'

const SocialInfoSection = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext<{
    contentLink: string
    instagram: string
    tiktok: string
  }>()
  const contentLink = values.contentLink || ''
  const instagram = values.instagram || ''
  const tiktok = values.tiktok || ''

  return (
    <div>
      <div className='mt-4'>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Show us your creative work
        </h2>
        <p className='mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
          Help us understand your creative focus and goals.
        </p>
      </div>

      <div className='mt-6 max-w-[640px] space-y-6'>
        <div>
          <label className='block text-[13px] md:text-[14px] text-black mb-2'>
            Content Creator link to instagram post you have made (this will show
            on your profile)
          </label>
          <BasicInput
            label=''
            type='url'
            value={contentLink}
            onChange={e => setFieldValue('contentLink', e.target.value)}
            placeholder='Link of content'
            error={touched.contentLink && errors.contentLink ? String(errors.contentLink) : undefined}
          />
        </div>

        <div>
          <label className='block text-[13px] md:text-[14px] text-black mb-2'>
            Content Creator link your Instagram
          </label>
          <BasicInput
            label=''
            type='url'
            value={instagram}
            onChange={e => setFieldValue('instagram', e.target.value)}
            placeholder='https://www.instagram.com'
            error={touched.instagram && errors.instagram ? String(errors.instagram) : undefined}
          />
        </div>

        <div>
          <label className='block text-[13px] md:text-[14px] text-black mb-2'>
            Content Creators Link your TikTok
          </label>
          <BasicInput
            label=''
            type='url'
            value={tiktok}
            onChange={e => setFieldValue('tiktok', e.target.value)}
            placeholder='https://www.tiktok.com'
            error={touched.tiktok && errors.tiktok ? String(errors.tiktok) : undefined}
          />
        </div>
      </div>
    </div>
  )
}

export default SocialInfoSection
