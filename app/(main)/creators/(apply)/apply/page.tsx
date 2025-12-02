'use client'

import { useEffect, useState } from 'react'
import CategorySection from './_components/sections/CategorySection'
import Button from '@/components/custom/Button'
import BasicInfoSection from './_components/sections/BasicInfoSection'
import ProfileInfoSection from './_components/sections/ProfileInfoSection'
import SocialInfoSection from './_components/sections/SocialInfoSection'
import { useFormik, FormikProvider, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { supabaseService } from '@/utils/supabase/services'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { mixpanelService } from '@/services/mixpanel'

const validationSchema = Yup.object({
  categories: Yup.array().of(Yup.string()).min(1, 'Select at least one'),
  name: Yup.string().trim().min(2, 'Enter a valid name').required('Required'),
  email: Yup.string().trim().email('Enter a valid email').required('Required'),
  phone: Yup.string()
    .trim()
    .matches(/^(?:\+?234|0)\d{10}$/, 'Enter a valid Nigerian phone number')
    .required('Required'),
  resident: Yup.string()
    .oneOf(['yes', 'no'], 'Select one')
    .required('Required'),
  profilePicture: Yup.mixed().nullable(),
  description: Yup.string().trim().min(10, 'Too short').required('Required'),
  contentLink: Yup.string()
    .trim()
    .url('Enter a valid URL')
    .required('Required'),
  instagram: Yup.string().trim().url('Enter a valid URL').nullable().optional(),
  tiktok: Yup.string().trim().url('Enter a valid URL').nullable().optional()
})

const stepFields: Record<number, string[]> = {
  1: ['categories'],
  2: ['name', 'email', 'phone'],
  3: ['resident', 'profilePicture', 'description'],
  4: ['contentLink', 'instagram', 'tiktok']
}

export default function CreatorApplyPage () {
  const [totalSteps] = useState(4)
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState('')

  const [lastProfileUpload, setLastProfileUpload] = useState<{
    name: string
    size: number
    lastModified: number
    url: string | null
    key: string | null
  } | null>(null)

  const router = useRouter()
  useEffect(() => {
    mixpanelService.track('APPLY_VIEWED', { totalSteps })
  }, [totalSteps])
  useEffect(() => {
    mixpanelService.track('APPLY_STEP_CHANGED', { step: currentStep })
  }, [currentStep])

  type FormValues = {
    categories: string[]
    name: string
    email: string
    phone: string
    resident: string
    profilePicture: File | null
    description: string
    contentLink: string
    instagram: string
    tiktok: string
  }

  const initialValues: FormValues = {
    categories: [],
    name: '',
    email: '',
    phone: '',
    resident: '',
    profilePicture: null,
    description: '',
    contentLink: '',
    instagram: '',
    tiktok: ''
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      setError('')
      mixpanelService.track('APPLY_SUBMIT_STARTED', {
        email: values.email.trim().toLowerCase()
      })
      const id = uuidv4()
      const emailLower = values.email.trim().toLowerCase()
      const { data: existing, error: existingError } =
        await supabaseService.client
          .from('creators_join_request')
          .select('id')
          .eq('email', emailLower)
          .limit(1)
      if (existingError) throw new Error(existingError.message)
      if (Array.isArray(existing) && existing.length > 0) {
        setError('You have already requested')
        mixpanelService.track('APPLY_ALREADY_REQUESTED', { email: emailLower })
        setSubmitting(false)
        return
      }

      let profileUrl: string | null = null
      if (values.profilePicture) {
        const f = values.profilePicture
        const sameAsLast =
          !!lastProfileUpload &&
          lastProfileUpload.name === f.name &&
          lastProfileUpload.size === f.size &&
          lastProfileUpload.lastModified === f.lastModified
        if (sameAsLast) {
          profileUrl = lastProfileUpload.url
          mixpanelService.track('APPLY_PROFILE_UPLOAD_REUSED', {
            name: f.name,
            size: f.size
          })
        } else {
          const ext = f.name.split('.').pop()?.toLowerCase() || 'jpg'
          const key = `profiles/${uuidv4()}.${ext}`
          const res = await supabaseService.uploadFile('profiles', key, f, {
            upsert: true
          })
          if (res.error) throw new Error(res.error)
          profileUrl = supabaseService.getPublicUrl('profiles', key)
          mixpanelService.track('APPLY_PROFILE_UPLOADED', { ext, size: f.size })
          setLastProfileUpload({
            name: f.name,
            size: f.size,
            lastModified: f.lastModified,
            url: profileUrl,
            key
          })
        }
      }

      const response = await supabaseService.insertDB(
        'creators_join_request',
        {
          categories: values.categories,
          name: values.name.trim(),
          email: emailLower,
          phone: values.phone.trim(),
          resident: values.resident,
          description: values.description.trim(),
          contentLink: values.contentLink.trim(),
          instagram: values.instagram || null,
          tiktok: values.tiktok || null,
          profilePictureUrl: profileUrl
        },
        id
      )
      console.log(response)
      mixpanelService.track('APPLY_SUBMITTED', {
        id,
        categories: values.categories.length
      })

      await fetch(`/api/apply-as-creator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailLower,
          name: values.name.trim()
        })
      })
      mixpanelService.track('APPLY_EMAIL_SENT', { email: emailLower })

      router.replace(`/creators/requested?id=${id}`)
    } catch (e) {
      console.log(e)
      const msg = e instanceof Error ? e.message : String(e)
      setError(msg)
      mixpanelService.track('APPLY_SUBMIT_FAILED', { error: msg })
    } finally {
      setSubmitting(false)
    }
  }
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit
  })

  return (
    <FormikProvider value={formik}>
      <section className='mt-8 w-full flex-col  '>
        <div className='w-full max-w-[580px] mx-auto'>
          <div className='flex items-center gap-3'>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                aria-hidden
                className={`h-[4px] flex-1 rounded-full ${
                  i < currentStep ? 'bg-primary' : 'bg-[#EAEAEA]'
                }`}
              />
            ))}
          </div>

          <div className='mt-4'>
            <p
              id='step-heading'
              className='text-primary text-[14px] md:text-[16px] font-medium'
            >
              Step {currentStep}/{totalSteps}
            </p>
          </div>
        </div>

        <div className=' w-full max-w-[640px] mx-auto flex flex-col'>
          {currentStep === 1 ? (
            <CategorySection />
          ) : currentStep === 2 ? (
            <BasicInfoSection />
          ) : currentStep === 3 ? (
            <ProfileInfoSection />
          ) : currentStep === 4 ? (
            <SocialInfoSection />
          ) : null}

          <div>
            {error ? (
              <p className='mt-1 text-[14px] text-red-500'>{error}</p>
            ) : null}
          </div>
          <div className='mt-8  w-full mx-auto ml-auto flex items-center justify-between '>
            {currentStep > 1 ? (
              <Button
                text='Previous Step'
                type='outline'
                className='w-auto px-5 font-medium py-[12px] text-[16px] rounded-[12px]'
                onClick={() => {
                  mixpanelService.track('APPLY_PREV_CLICK', {
                    step: currentStep
                  })
                  setCurrentStep(prev => (prev > 1 ? prev - 1 : prev))
                }}
              />
            ) : (
              <div />
            )}
            <Button
              text={currentStep < totalSteps ? 'Next Step' : 'Submit'}
              className=' w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px]'
              isSubmit={currentStep === totalSteps && formik.isSubmitting}
              onClick={() => {
                const fields = stepFields[currentStep] || []
                fields.forEach(f => formik.setFieldTouched(f, true))
                formik.validateForm().then(errs => {
                  const hasErr = fields.some(f =>
                    Boolean((errs as Record<string, unknown>)[f])
                  )
                  if (hasErr) {
                    mixpanelService.track('APPLY_STEP_VALIDATION_ERROR', {
                      step: currentStep
                    })
                    return
                  }
                  if (currentStep < totalSteps) {
                    mixpanelService.track('APPLY_NEXT_CLICK', {
                      step: currentStep
                    })
                    setCurrentStep(prev =>
                      prev < totalSteps ? prev + 1 : prev
                    )
                  } else {
                    mixpanelService.track('APPLY_SUBMIT_CLICK', {
                      step: currentStep
                    })
                    formik.submitForm()
                  }
                })
              }}
            />
          </div>
        </div>
      </section>
    </FormikProvider>
  )
}
