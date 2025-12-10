'use client'

import { useEffect, useState } from 'react'
import CategorySection from './_components/sections/CategorySection'
import Button from '@/components/custom/Button'
import BasicInfoSection from './_components/sections/BasicInfoSection'
import AdditionalBrandInfoSection from './_components/sections/AdditionalBrandInfoSection'
import { useFormik, FormikProvider, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { supabaseService } from '@/utils/supabase/services'
import { useRouter } from 'next/navigation'
import { mixpanelService } from '@/services/mixpanel'
import { supabaseAuthService } from '@/utils/supabase/services/auth'
import { toast } from 'sonner'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'

const validationSchema = Yup.object({
  categories: Yup.array().of(Yup.string()).min(1, 'Select at least one'),
  name: Yup.string().trim().min(2, 'Enter a valid name').required('Required'),
  email: Yup.string().trim().email('Enter a valid email').required('Required'),
  password: Yup.string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
  resident: Yup.string()
    .oneOf(['yes', 'no'], 'Select one')
    .required('Required'),
  brandSize: Yup.string()
    .oneOf(['1-10', '11-50', '51-200', '200+'], 'Select a valid option')
    .required('Required'),
  phone: Yup.string()
    .trim()
    .matches(/^(?:\+?234|0)\d{10}$/, {
      message: 'Enter a valid Nigerian phone number',
      excludeEmptyString: true
    })
    .nullable()
    .optional()
})

const stepFields: Record<number, string[]> = {
  1: ['categories'],
  2: ['name', 'email', 'password', 'confirmPassword'],
  3: ['resident', 'brandSize', 'phone']
}

export default function CreatorApplyPage () {
  const [totalSteps] = useState(4)
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState('')

  const router = useRouter()

  const fetchCurrentUser = useContextSelector(
    UserContext,
    state => state.fetchCurrentUser
  )

  const setAllowRedirect = useContextSelector(
    UserContext,
    state => state.setAllowRedirect
  )

  useEffect(() => {
    mixpanelService.track('BRAND_REGISTRATION_VIEWED', { totalSteps })
  }, [totalSteps])
  useEffect(() => {
    mixpanelService.track('BRAND_REGISTRATION_STEP_CHANGED', {
      step: currentStep
    })
  }, [currentStep])

  type FormValues = {
    categories: string[]
    name: string
    email: string
    password: string
    confirmPassword: string
    brandSize: string
    resident: string
    phone: string | null
  }

  const initialValues: FormValues = {
    categories: [],
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    brandSize: '',
    resident: '',
    phone: null
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      setAllowRedirect(false)
      setError('')
      mixpanelService.track('BRAND_REGISTRATION_SUBMIT_STARTED', {
        email: values.email.trim().toLowerCase()
      })
      const emailLower = values.email.trim().toLowerCase()

      if (!emailLower || !/\S+@\S+\.\S+/.test(emailLower)) {
        setError('Enter a valid email')
        toast.error('Enter a valid email')
        return
      }

      const password = String(values.password)
      const signUpRes = await supabaseAuthService.signUpWithEmailAndPassword(
        emailLower,
        password
      )
      if (!signUpRes.success) {
        const msg = signUpRes.message || 'Failed to create brand account'
        setError(msg)
        toast.error(msg)
        mixpanelService.track('BRAND_ACCOUNT_CREATE_FAILED', {
          email: emailLower
        })
        return
      }
      const userId = signUpRes.data?.user?.id

      try {
        const { error: userInsertError } = await supabaseService.client
          .from('users')
          .insert({
            id: userId,
            email: emailLower,
            name: values.name.trim(),
            role: 'BRAND',
            profilePictureUrl: null,
            phoneNumber: values.phone ? values.phone.trim() : '',
            isEmailVerified: false,
            resident: values.resident || 'no',
            isDisabled: false,
            isDisabledAt: null,
            isSuspendedAt: null,
            isSuspended: false
          })
        if (userInsertError) throw new Error(userInsertError.message)

        const { error: profileInsertError } = await supabaseService.client
          .from('brand_profile')
          .insert({
            userId,
            categories: values.categories || [],
            brandSize: values.brandSize || ''
          })
        if (profileInsertError) throw new Error(profileInsertError.message)

        await fetchCurrentUser({ load: false })
      } catch (e) {
        toast.error('Failed to finalize brand account setup')
        throw e as Error
      }

      mixpanelService.track('BRAND_ACCOUNT_CREATED', { email: emailLower })
      toast.success('Account created. Please verify your email')
      router.replace(`/brands/verify-email`)
    } catch (e) {
      console.log(e)
      const msg = e instanceof Error ? e.message : String(e)
      setError(msg)
      mixpanelService.track('BRAND_REGISTRATION_SUBMIT_FAILED', { error: msg })
    } finally {
      setSubmitting(false)
      setTimeout(() => setAllowRedirect(true), 50)
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
            <AdditionalBrandInfoSection />
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
                  mixpanelService.track('BRAND_REGISTRATION_PREV_CLICK', {
                    step: currentStep
                  })
                  setCurrentStep(prev => (prev > 1 ? prev - 1 : prev))
                }}
              />
            ) : (
              <div />
            )}
            <Button
              text={currentStep < totalSteps - 1 ? 'Next Step' : 'Submit'}
              className=' w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px]'
              isSubmit={currentStep === totalSteps - 1 && formik.isSubmitting}
              onClick={() => {
                const fields = stepFields[currentStep] || []
                fields.forEach(f => formik.setFieldTouched(f, true))
                formik.validateForm().then(errs => {
                  const hasErr = fields.some(f =>
                    Boolean((errs as Record<string, unknown>)[f])
                  )
                  if (hasErr) {
                    mixpanelService.track(
                      'BRAND_REGISTRATION_STEP_VALIDATION_ERROR',
                      {
                        step: currentStep
                      }
                    )
                    return
                  }
                  if (currentStep < totalSteps - 1) {
                    mixpanelService.track('BRAND_REGISTRATION_NEXT_CLICK', {
                      step: currentStep
                    })
                    setCurrentStep(prev =>
                      prev < totalSteps ? prev + 1 : prev
                    )
                  } else {
                    mixpanelService.track('BRAND_REGISTRATION_SUBMIT_CLICK', {
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
