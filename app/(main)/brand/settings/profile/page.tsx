'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import BasicInput from '@/components/input/BasicInput'
import Button from '@/components/custom/Button'
import CustomPhoneInput from '@/components/input/CustomPhoneInput'
import CustomSelect from '@/components/input/CustomSelect'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { supabaseService } from '@/utils/supabase/services'

const schema = Yup.object({
  name: Yup.string().trim().min(2, 'Enter a valid name').required('Required'),
  phoneNumber: Yup.string()
    .trim()
    .matches(/^(?:\+?234|0)\d{10}$/, {
      message: 'Enter a valid Nigerian phone number',
      excludeEmptyString: true
    })
    .nullable()
    .optional(),
  resident: Yup.string().oneOf(['yes', 'no'], 'Select one').required('Required'),
  brandSize: Yup.string()
    .oneOf(['1-10', '11-50', '51-200', '200+'], 'Select a valid option')
    .required('Required'),
  profilePicture: Yup.mixed().nullable().optional()
})

export default function BrandProfileSettingsPage () {
  const currentUser = useContextSelector(UserContext, state => state.currentUser)
  const fetchCurrentUser = useContextSelector(UserContext, state => state.fetchCurrentUser)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const {
    values,
    errors,
    touched,
    handleChange,
    validateForm,
    submitForm,
    setTouched,
    setFieldValue
  } = useFormik<{
    name: string
    phoneNumber: string | null
    resident: string
    brandSize: string
    profilePicture: File | null
  }>({
    initialValues: {
      name: currentUser?.name || '',
      phoneNumber: currentUser?.phoneNumber || '',
      resident: typeof currentUser?.resident === 'string' ? String(currentUser?.resident) : '',
      brandSize: '',
      profilePicture: null
    },
    validationSchema: schema,
    onSubmit: async vals => {
      try {
        setIsSubmitting(true)
        let profileUrl = currentUser?.profilePictureUrl || null
        if (vals.profilePicture) {
          const f = vals.profilePicture
          const ext = f.name.split('.').pop()?.toLowerCase() || 'jpg'
          const key = `profiles/${Date.now()}.${ext}`
          const res = await supabaseService.uploadFile('profiles', key, f, { upsert: true })
          if (res.error) throw new Error(res.error)
          profileUrl = supabaseService.getPublicUrl('profiles', key)
        }
        const userId = currentUser?.id || ''
        if (!userId) throw new Error('Not authenticated')

        const { error: userUpdateError } = await supabaseService.client
          .from('users')
          .update({
            name: vals.name.trim(),
            phoneNumber: vals.phoneNumber ? vals.phoneNumber.trim() : '',
            resident: vals.resident,
            profilePictureUrl: profileUrl || ''
          })
          .eq('id', userId)
        if (userUpdateError) throw new Error(userUpdateError.message)

        const { data: existing, error: exErr } = await supabaseService.client
          .from('brand_profile')
          .select('id')
          .eq('userId', userId)
          .maybeSingle()
        if (exErr) throw new Error(exErr.message)

        if (existing?.id) {
          const { error: profileUpdateError } = await supabaseService.client
            .from('brand_profile')
            .update({ brandSize: vals.brandSize || '' })
            .eq('id', existing.id)
          if (profileUpdateError) throw new Error(profileUpdateError.message)
        } else {
          const { error: profileInsertError } = await supabaseService.client
            .from('brand_profile')
            .insert({ userId, brandSize: vals.brandSize || '' })
          if (profileInsertError) throw new Error(profileInsertError.message)
        }

        await fetchCurrentUser({ load: false })
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
        const { data } = await supabaseService.client
          .from('brand_profile')
          .select('brandSize')
          .eq('userId', userId)
          .limit(1)
        const row = (data || [])[0] as { brandSize?: string } | undefined
        const bs = row?.brandSize || ''
        setFieldValue('brandSize', bs)
      } catch {}
    })()
  }, [currentUser?.id])

  return (
    <div className='font-sans'>
      <div className='pr-10'>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>Profile Settings</h2>
        <p className='mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
          Update your brand details.
        </p>
      </div>

      <div className='mt-6 md:max-w-[640px] space-y-6'>
        <BasicInput
          label='Brand Name'
          name='name'
          value={values.name}
          onChange={handleChange}
          placeholder='Brand Name'
          error={touched.name && errors.name ? String(errors.name) : undefined}
        />

        <CustomPhoneInput
          label='Phone No'
          value={values.phoneNumber || ''}
          onChange={v => setFieldValue('phoneNumber', v)}
          className=''
          error={
            touched.phoneNumber && errors.phoneNumber ? String(errors.phoneNumber) : undefined
          }
        />

        <CustomSelect
          label='Is your brand based in Nigeria?'
          value={values.resident}
          onChange={v => setFieldValue('resident', v)}
          placeholder='Select'
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
          ]}
          error={touched.resident && errors.resident ? String(errors.resident) : undefined}
        />

        <CustomSelect
          label='Brand Size'
          value={values.brandSize}
          onChange={v => setFieldValue('brandSize', v)}
          placeholder={values.brandSize ? values.brandSize : 'Select Size'}
          options={[
            { value: '1-10', label: '1-10' },
            { value: '11-50', label: '11-50' },
            { value: '51-200', label: '51-200' },
            { value: '200+', label: '200+' }
          ]}
          error={touched.brandSize && errors.brandSize ? String(errors.brandSize) : undefined}
        />

        <div>
          <label className='block text-[13px] md:text-[14px] text-black mb-2'>
            Upload a Brand Logo or Image
          </label>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            hidden
            onChange={e => setFieldValue('profilePicture', e.target.files?.[0] || null)}
          />
          <div
            role='button'
            aria-label='Upload brand image'
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
              const file = e.dataTransfer.files?.[0]
              if (file) setFieldValue('profilePicture', file)
              setIsDragging(false)
            }}
            className={`w-full min-h-[120px] md:min-h-[160px] px-4 py-3 rounded-[12px] md:rounded-[16px] border text-[14px] md:text-[16px] ${
              isDragging ? 'bg-[#E9F5F3] border-primary' : 'bg-[#F8F8F8] border-[#EFEFEF]'
            } text-black outline-none`}
          >
            <p className='text-[12px] md:text-[14px] text-text-color-200'>
              Drag and drop an image or click to upload.
            </p>
          </div>
        </div>

        <div className='pt-2'>
          <Button
            text='Save Changes'
            aria-label='Save changes'
            className='w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px] bg-[#327468] hover:bg-[#285d54]'
            buttonType='button'
            isSubmit={isSubmitting}
            onClick={() => {
              setTouched({
                name: true,
                phoneNumber: true,
                resident: true,
                brandSize: true
              })
              validateForm().then(errs => {
                const hasErr = Boolean(
                  (errs as any).name ||
                    (errs as any).phoneNumber ||
                    (errs as any).resident ||
                    (errs as any).brandSize
                )
                if (hasErr) return
                submitForm()
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}
