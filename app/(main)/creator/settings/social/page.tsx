'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import BasicInput from '@/components/input/BasicInput'
import Button from '@/components/custom/Button'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { supabaseService } from '@/utils/supabase/services'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'

const schema = Yup.object({
  contentLink: Yup.string()
    .trim()
    .url('Enter a valid URL')
    .nullable()
    .optional(),
  instagramLink: Yup.string()
    .trim()
    .url('Enter a valid URL')
    .nullable()
    .optional(),
  tiktokLink: Yup.string().trim().url('Enter a valid URL').nullable().optional()
})

export default function SocialSettingsPage () {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )

  const formik = useFormik<{
    contentLink: string
    instagramLink: string
    tiktokLink: string
  }>({
    initialValues: { contentLink: '', instagramLink: '', tiktokLink: '' },
    validationSchema: schema,
    onSubmit: async values => {
      try {
        setIsSubmitting(true)
        const userId = currentUser?.id || ''
        if (!userId) throw new Error('Not authenticated')
        const { error } = await supabaseService.client
          .from('user_profile')
          .update({
            contentLink: values.contentLink || null,
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
        const profile = await supabaseService.getDB<{
          contentLink: string | null
          instagramLink: string | null
          tiktokLink: string | null
        }>('user_profile', {
          filters: { userId },
          single: true
        })
        const cl = (profile as any)?.contentLink || ''
        const ig = (profile as any)?.instagramLink || ''
        const tk = (profile as any)?.tiktokLink || ''
        formik.setFieldValue('contentLink', cl)
        formik.setFieldValue('instagramLink', ig)
        formik.setFieldValue('tiktokLink', tk)
      } catch {}
    })()
  }, [currentUser?.id])

  return (
      <div className='font-sans space-y-6'>
      <div>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Social Profiles
        </h2>
        <p className='text-text-color-200 text-[14px] md:text-[16px]'>
          Help us understand your creative focus and goals.
        </p>
      </div>
      <div>
        <label className='block text-[13px] md:text-[14px] text-black mb-2'>
          Content Creator link to instagram post you have made (this will show
          on your profile)
        </label>
        <input
          name='contentLink'
          value={formik.values.contentLink}
          onChange={e => formik.setFieldValue('contentLink', e.target.value)}
          placeholder='Link of content'
          className='w-full h-[48px] md:h-[54px] px-4 rounded-[12px] md:rounded-[16px] bg-[#F8F8F8] border border-[#EFEFEF] text-[14px] md:text-[16px] text-black outline-none'
        />
      </div>

      <BasicInput
        label='Content Creator link your Instagram'
        name='instagramLink'
        value={formik.values.instagramLink}
        onChange={formik.handleChange}
        placeholder='https://www.instagram.com'
        error={
          formik.touched.instagramLink && formik.errors.instagramLink
            ? String(formik.errors.instagramLink)
            : undefined
        }
      />

      <BasicInput
        label='Content Creators Link your TikTok'
        name='tiktokLink'
        value={formik.values.tiktokLink}
        onChange={formik.handleChange}
        placeholder='https://www.tiktok.com'
        error={
          formik.touched.tiktokLink && formik.errors.tiktokLink
            ? String(formik.errors.tiktokLink)
            : undefined
        }
      />

      <div className='pt-2'>
        <Button
          text='Save Changes'
          aria-label='Save social profiles'
          className='w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px] bg-[#327468] hover:bg-[#285d54]'
          buttonType='button'
          isSubmit={isSubmitting}
          onClick={() => {
            formik.setTouched({
              contentLink: true,
              instagramLink: true,
              tiktokLink: true
            })
            formik.validateForm().then(errs => {
              const hasErr = Boolean(
                (errs as any).contentLink ||
                  (errs as any).instagramLink ||
                  (errs as any).tiktokLink
              )
              if (hasErr) return
              formik.submitForm()
            })
          }}
        />
      </div>
    </div>
  )
}
