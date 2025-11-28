'use client'

import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import BasicInput from '@/components/input/BasicInput'
import Button from '@/components/custom/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useRef, useState } from 'react'
import { CloudUpload } from 'lucide-react'
import { toast } from 'sonner'
import { supabaseService } from '@/utils/supabase/services'

const schema = Yup.object({
  name: Yup.string().trim().min(2, 'Enter a valid name').required('Required'),
  phoneNumber: Yup.string()
    .trim()
    .matches(/^(?:\+?234|0)\d{10}$/, 'Enter a valid Nigerian phone number')
    .required('Required'),
  resident: Yup.string()
    .oneOf(['yes', 'no'], 'Select one')
    .required('Required'),
  description: Yup.string().trim().min(10, 'Too short').required('Required'),
  profilePicture: Yup.mixed().nullable()
})

const CreatorsDashboard = () => {
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const formik = useFormik<{
    name: string
    phoneNumber: string
    resident: string
    description: string
    profilePicture: File | null
  }>({
    initialValues: {
      name: currentUser?.name || '',
      phoneNumber: currentUser?.phoneNumber || '',
      resident:
        typeof currentUser?.resident === 'string'
          ? String(currentUser?.resident)
          : '',
      description: '',
      profilePicture: null
    },
    validationSchema: schema,
    onSubmit: async values => {
      try {
        setIsSubmitting(true)
        let profileUrl = currentUser?.profilePictureUrl || null
        if (values.profilePicture) {
          const f = values.profilePicture
          const ext = f.name.split('.').pop()?.toLowerCase() || 'jpg'
          const key = `profiles/${Date.now()}.${ext}`
          const res = await supabaseService.uploadFile('profiles', key, f, {
            upsert: true
          })
          if (res.error) throw new Error(res.error)
          profileUrl = supabaseService.getPublicUrl('profiles', key)
        }

        const userId = currentUser?.id || ''
        if (!userId) throw new Error('Not authenticated')

        const { error: userUpdateError } = await supabaseService.client
          .from('users')
          .update({
            name: values.name.trim(),
            phoneNumber: values.phoneNumber.trim(),
            resident: values.resident,
            profilePictureUrl: profileUrl || ''
          })
          .eq('id', userId)
        if (userUpdateError) throw new Error(userUpdateError.message)

        const { error: profileUpdateError } = await supabaseService.client
          .from('user_profile')
          .update({
            description: values.description.trim()
          })
          .eq('userId', userId)
        if (profileUpdateError) throw new Error(profileUpdateError.message)

        toast.success('Settings updated')
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
        const profile = await supabaseService.getDB<{ description: string }>(
          'user_profile',
          {
            filters: { userId },
            single: true
          }
        )
        const desc =
          (profile as { description?: string } | null)?.description || ''
        formik.setFieldValue('description', desc)
      } catch {}
    })()
  }, [currentUser?.id])

  return (
    <div className='font-sans'>
      <div className='  pr-10  '>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Profile Settings
        </h2>
        <p className='mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
          Help us understand your creative focus and goals.
        </p>
      </div>

      <div className=' mt-6 md:max-w-[640px] space-y-6'>
        <BasicInput
          label='Name'
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder='Full Name'
          error={
            formik.touched.name && formik.errors.name
              ? String(formik.errors.name)
              : undefined
          }
        />

        <BasicInput
          label='Phone No'
          name='phoneNumber'
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          placeholder='Phone No'
          error={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? String(formik.errors.phoneNumber)
              : undefined
          }
        />

        <div>
          <label className='block text-[13px] md:text-[14px] text-black mb-2'>
            Do you live in Nigeria
          </label>
          <select
            value={formik.values.resident}
            onChange={e => formik.setFieldValue('resident', e.target.value)}
            className='w-full h-[48px] md:h-[54px] px-4 rounded-[12px] md:rounded-[16px] bg-[#F8F8F8] border border-[#EFEFEF] text-[14px] md:text-[16px] text-black outline-none'
          >
            <option value='' disabled>
              Select
            </option>
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </select>
          {formik.touched.resident && formik.errors.resident ? (
            <p className='mt-1 text-[12px] text-red-500'>
              {String(formik.errors.resident)}
            </p>
          ) : null}
        </div>

        <div>
          <label className='block text-[13px] md:text-[14px] text-black mb-2'>
            Content Creators upload a Profile Picture
          </label>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            hidden
            onChange={e =>
              formik.setFieldValue(
                'profilePicture',
                e.target.files?.[0] || null
              )
            }
          />
          <div
            role='button'
            aria-label='Upload profile picture'
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={e => {
              e.preventDefault()
              setIsDragging(false)
            }}
            onDrop={e => {
              e.preventDefault()
              setIsDragging(false)
              formik.setFieldValue(
                'profilePicture',
                e.dataTransfer.files?.[0] || null
              )
            }}
            className={`min-h-[140px] md:min-h-[160px] flex items-center justify-center text-center rounded-[12px] md:rounded-[16px] border ${
              isDragging
                ? 'border-primary bg-[#F5FFFD]'
                : 'border-[#EFEFEF] bg-[#F8F8F8]'
            }`}
          >
            <div className='flex flex-col items-center gap-2 px-6 py-8'>
              <CloudUpload className='h-6 w-6 text-text-color-200' />
              <span className='text-[14px] md:text-[16px] text-text-color-200'>
                {formik.values.profilePicture?.name ||
                  'Click to upload file or drag-and-drop.'}
              </span>
              <span className='text-[12px] text-text-color-200'>Max 25 MB</span>
            </div>
          </div>
        </div>

        <div>
          <label className='block text-[13px] md:text-[14px] text-black mb-2'>
            Add a short Description for yourself
          </label>
          <textarea
            value={formik.values.description}
            onChange={e => formik.setFieldValue('description', e.target.value)}
            placeholder='Description'
            className='w-full min-h-[120px] md:min-h-[160px] px-4 py-3 rounded-[12px] md:rounded-[16px] bg-[#F8F8F8] border border-[#EFEFEF] text-[14px] md:text-[16px] text-black placeholder:text-text-color-200 outline-none'
          />
          {formik.touched.description && formik.errors.description ? (
            <p className='mt-1 text-[12px] text-red-500'>
              {String(formik.errors.description)}
            </p>
          ) : null}
        </div>

        <div className='pt-2'>
          <Button
            text='Save Changes'
            aria-label='Save changes'
            className='w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px] bg-[#327468] hover:bg-[#285d54]'
            buttonType='button'
            isSubmit={isSubmitting}
            onClick={() => {
              formik.setTouched({
                name: true,
                phoneNumber: true,
                resident: true,
                description: true
              })
              formik.validateForm().then(errs => {
                const hasErr = Boolean(
                  (errs as any).name ||
                    (errs as any).phoneNumber ||
                    (errs as any).resident ||
                    (errs as any).description
                )
                if (hasErr) return
                formik.submitForm()
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CreatorsDashboard
