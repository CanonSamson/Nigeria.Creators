'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { supabaseService } from '@/utils/supabase/services'
import BasicInput from '@/components/input/BasicInput'

const schema = Yup.object({
  websiteLink: Yup.string().url('Enter a valid URL').optional().nullable(),
  instagramLink: Yup.string().url('Enter a valid URL').optional().nullable(),
  tiktokLink: Yup.string().url('Enter a valid URL').optional().nullable()
})

export default function BrandSocialSettingsPage () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentUser = useContextSelector(UserContext, state => state.currentUser)

  const formik = useFormik<{
    websiteLink: string
    instagramLink: string
    tiktokLink: string
  }>({
    initialValues: { websiteLink: '', instagramLink: '', tiktokLink: '' },
    validationSchema: schema,
    onSubmit: async values => {
      try {
        setIsSubmitting(true)
        const userId = currentUser?.id || ''
        if (!userId) throw new Error('Not authenticated')
        const { error } = await supabaseService.client
          .from('brand_profile')
          .update({
            websiteLink: values.websiteLink || null,
            instagramLink: values.instagramLink || null,
            tiktokLink: values.tiktokLink || null
          })
          .eq('userId', userId)
        if (error) throw new Error(error.message)
        toast.success('Social profiles updated')
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        toast.error(msg)
      } finally {
        setIsSubmitting(false)
      }
    }
  })

  useEffect(() => {
    ;(async () => {
      try {
        const userId = currentUser?.id || ''
        if (!userId) return
        const profile = await supabaseService.client
          .from('brand_profile')
          .select('websiteLink, instagramLink, tiktokLink')
          .eq('userId', userId)
          .limit(1)
        const row = (profile.data || [])[0] as {
          websiteLink?: string | null
          instagramLink?: string | null
          tiktokLink?: string | null
        } | undefined
        const wl = row?.websiteLink || ''
        const ig = row?.instagramLink || ''
        const tk = row?.tiktokLink || ''
        formik.setFieldValue('websiteLink', wl)
        formik.setFieldValue('instagramLink', ig)
        formik.setFieldValue('tiktokLink', tk)
      } catch {}
    })()
  }, [currentUser?.id])

  return (
    <div className='font-sans space-y-6'>
      <div>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>Social Profiles</h2>
        <p className='text-text-color-200 text-[14px] md:text-[16px]'>
          Add links so creators can learn more about your brand.
        </p>
      </div>

      <BasicInput
        label='Website'
        name='websiteLink'
        value={formik.values.websiteLink}
        onChange={e => formik.setFieldValue('websiteLink', e.target.value)}
        placeholder='https://your-website.com'
        error={
          formik.touched.websiteLink && formik.errors.websiteLink
            ? String(formik.errors.websiteLink)
            : undefined
        }
      />

      <BasicInput
        label='Instagram'
        name='instagramLink'
        value={formik.values.instagramLink}
        onChange={e => formik.setFieldValue('instagramLink', e.target.value)}
        placeholder='https://instagram.com/yourbrand'
        error={
          formik.touched.instagramLink && formik.errors.instagramLink
            ? String(formik.errors.instagramLink)
            : undefined
        }
      />

      <BasicInput
        label='TikTok'
        name='tiktokLink'
        value={formik.values.tiktokLink}
        onChange={e => formik.setFieldValue('tiktokLink', e.target.value)}
        placeholder='https://tiktok.com/@yourbrand'
        error={
          formik.touched.tiktokLink && formik.errors.tiktokLink
            ? String(formik.errors.tiktokLink)
            : undefined
        }
      />

      <div className='pt-2'>
        <button
          type='button'
          onClick={() => formik.submitForm()}
          className='w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px] bg-[#327468] hover:bg-[#285d54] text-white'
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

