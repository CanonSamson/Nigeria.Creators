'use client'

import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import BasicInput from '@/components/input/BasicInput'
import CustomPhoneInput from '@/components/input/CustomPhoneInput'
import Button from '@/components/custom/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useRef, useState } from 'react'
import { CloudUpload } from 'lucide-react'
import { toast } from 'sonner'
import { supabaseService } from '@/utils/supabase/services'
import { statesInNIgeriaOptions } from '@/utils/options'
import CustomSelect from '@/components/input/CustomSelect'
import { useQuery } from '@tanstack/react-query'

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
  profilePicture: Yup.mixed().nullable(),
  state: Yup.string().trim().optional().nullable()
})

const CreatorsDashboard = () => {
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const fetchCurrentUser = useContextSelector(
    UserContext,
    state => state.fetchCurrentUser
  )

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
    phoneNumber: string
    resident: string
    description: string
    profilePicture: File | null
    state: string
  }>({
    initialValues: {
      name: currentUser?.name || '',
      phoneNumber: currentUser?.phoneNumber || '',
      resident:
        typeof currentUser?.resident === 'string'
          ? String(currentUser?.resident)
          : '',
      description: '',
      profilePicture: null,
      state: ''
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
            description: values.description.trim(),
            state: values.resident === 'yes' ? values.state : null
          })
          .eq('userId', userId)
        if (profileUpdateError) throw new Error(profileUpdateError.message)

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

  const { data: profile } = useQuery<{ description?: string; state?: string } | null>({
    queryKey: ['creator-profile', currentUser?.id],
    enabled: !!currentUser?.id,
    queryFn: async () => {
      const p = await supabaseService.getDB<{ description: string; state?: string }>(
        'user_profile',
        { filters: { userId: currentUser?.id || '' }, single: true }
      )
      return (p as { description?: string; state?: string } | null) || null
    }
  })
  useEffect(() => {
    const desc = (profile as { description?: string } | null)?.description || ''
    const st = (profile as { state?: string } | null)?.state || ''
    setFieldValue('description', desc)
    setFieldValue('state', st)
  }, [profile])

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
          value={values.name}
          onChange={handleChange}
          placeholder='Full Name'
          error={touched.name && errors.name ? String(errors.name) : undefined}
        />

        <CustomPhoneInput
          label='Phone No'
          value={values.phoneNumber}
          onChange={v => setFieldValue('phoneNumber', v)}
          className=''
          error={
            touched.phoneNumber && errors.phoneNumber
              ? String(errors.phoneNumber)
              : undefined
          }
        />

        <CustomSelect
          label='Do you live in Nigeria'
          value={values.resident}
          onChange={v => setFieldValue('resident', v)}
          placeholder='Select'
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
          ]}
          error={
            touched.resident && errors.resident
              ? String(errors.resident)
              : undefined
          }
        />

        {values.resident === 'yes' ? (
          <CustomSelect
            label='Which state in Nigeria?'
            value={values.state}
            onChange={v => setFieldValue('state', v)}
            placeholder={values.state ? values.state : 'Select State'}
            options={statesInNIgeriaOptions}
            isSearchable
            error={
              touched.state && errors.state ? String(errors.state) : undefined
            }
          />
        ) : null}

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
              setFieldValue('profilePicture', e.target.files?.[0] || null)
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
              setFieldValue('profilePicture', e.dataTransfer.files?.[0] || null)
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
                {values.profilePicture?.name ||
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
            value={values.description}
            onChange={e => setFieldValue('description', e.target.value)}
            placeholder='Description'
            className='w-full min-h-[120px] md:min-h-[160px] px-4 py-3 rounded-[12px] md:rounded-[16px] bg-[#F8F8F8] border border-[#EFEFEF] text-[14px] md:text-[16px] text-black placeholder:text-text-color-200 outline-none'
          />
          {touched.description && errors.description ? (
            <p className='mt-1 text-[12px] text-red-500'>
              {String(errors.description)}
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
              setTouched({
                name: true,
                phoneNumber: true,
                resident: true,
                description: true
              })
              validateForm().then(errs => {
                const hasErr = Boolean(
                  (errs as any).name ||
                    (errs as any).phoneNumber ||
                    (errs as any).resident ||
                    (errs as any).description
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

export default CreatorsDashboard
