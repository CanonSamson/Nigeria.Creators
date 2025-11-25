'use client'

import { useState } from 'react'
import CategorySection from './_components/sections/CategorySection'
import Button from '@/components/custom/Button'
import BasicInfoSection from './_components/sections/BasicInfoSection'
import ProfileInfoSection from './_components/sections/ProfileInfoSection'
import SocialInfoSection from './_components/sections/SocialInfoSection'
import { Formik, FormikHelpers, FormikValues } from 'formik'
import * as Yup from 'yup'
import { supabaseService } from '@/utils/supabase/services'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const validationSchema = Yup.object({
  categories: Yup.array().of(Yup.string()).min(1, 'Select at least one'),
  name: Yup.string().trim().min(2, 'Enter a valid name').required('Required'),
  email: Yup.string().trim().email('Enter a valid email').required('Required'),
  phone: Yup.string()
    .trim()
    .matches(/^(?:\+?234|0)\d{10}$/,
      'Enter a valid Nigerian phone number')
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
  const [currentStep, setCurrentStep] = useState(2)
  const [lastProfileUpload, setLastProfileUpload] = useState<{
    name: string
    size: number
    lastModified: number
    url: string | null
    key: string | null
  } | null>(null)

  const router = useRouter()

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
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const id = uuidv4()
      const emailLower = values.email.trim().toLowerCase()
      const { data: existing, error: existingError } =
        await supabaseService.client
          .from('creators-join-request')
          .select('id')
          .eq('email', emailLower)
          .limit(1)
      if (existingError) throw new Error(existingError.message)
      if (Array.isArray(existing) && existing.length > 0) {
        toast.error('You have already requested')
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
        } else {
          const ext = f.name.split('.').pop()?.toLowerCase() || 'jpg'
          const key = `profiles/${uuidv4()}.${ext}`
          const res = await supabaseService.uploadFile('profiles', key, f, {
            upsert: true
          })
          if (res.error) throw new Error(res.error)
          profileUrl = supabaseService.getPublicUrl('profiles', key)
          setLastProfileUpload({
            name: f.name,
            size: f.size,
            lastModified: f.lastModified,
            url: profileUrl,
            key
          })
        }
      }

      await supabaseService.insertDB(
        'creators-join-request',
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
          profilePictureUrl: profileUrl,
        },
        id
      )

      router.replace(`/creators/requested?id=${id}`)
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ validateForm, submitForm, setFieldTouched, isSubmitting }) => (
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

            <div className='mt-8  w-full mx-auto ml-auto flex items-center justify-between '>
              {currentStep > 1 ? (
                <Button
                  text='Previous Step'
                  type='outline'
                  className='w-auto px-5 font-medium py-[12px] text-[16px] rounded-[12px]'
                  onClick={() =>
                    setCurrentStep(prev => (prev > 1 ? prev - 1 : prev))
                  }
                />
              ) : (
                <div />
              )}
              <Button
                text={currentStep < totalSteps ? 'Next Step' : 'Submit'}
                className=' w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px]'
                isSubmit={currentStep === totalSteps && isSubmitting}
                onClick={() => {
                  const fields = stepFields[currentStep] || []
                  fields.forEach(f => setFieldTouched(f, true))
                  validateForm().then(errs => {
                    const hasErr = fields.some(f =>
                      Boolean((errs as Record<string, unknown>)[f])
                    )
                    if (hasErr) return
                    if (currentStep < totalSteps) {
                      setCurrentStep(prev =>
                        prev < totalSteps ? prev + 1 : prev
                      )
                    } else {
                      submitForm()
                    }
                  })
                }}
              />
            </div>
          </div>
        </section>
      )}
    </Formik>
  )
}
