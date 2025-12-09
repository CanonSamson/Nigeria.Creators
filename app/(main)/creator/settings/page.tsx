'use client'

import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { supabaseService } from '@/utils/supabase/services'
import { categories as creatorCategories } from '@/utils/options'
import { useQuery } from '@tanstack/react-query'
import SettingsCard from '@/components/card/SettingsCard'

const schema = Yup.object({
  categories: Yup.array()
    .of(Yup.string())
    .min(1, 'Select at least one')
    .required('Required')
})

const CreatorsDashboard = () => {
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileVisible, setProfileVisible] = useState(true)

  const persistVisibility = async (next = profileVisible) => {
    try {
      setIsSaving(true)
      const userId = currentUser?.id || ''
      if (!userId) return
      const { error } = await supabaseService.client
        .from('users')
        .update({ isProfileVisible: next })
        .eq('id', userId)
      if (error) throw new Error(error.message)
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      toast.error(msg)
    } finally {
      setIsSaving(false)
    }
  }
  const fetchCurrentUser = useContextSelector(
    UserContext,
    state => state.fetchCurrentUser
  )

  const { values, errors, touched, setFieldValue } = useFormik<{
    categories: string[]
  }>({
    initialValues: {
      categories: []
    },
    validationSchema: schema,
    onSubmit: async values => {
      try {
        setIsSubmitting(true)
        const userId = currentUser?.id || ''
        if (!userId) throw new Error('Not authenticated')
        const { error: profileUpdateError } = await supabaseService.client
          .from('user_profile')
          .update({ categories: values.categories })
          .eq('userId', userId)
        if (profileUpdateError) throw new Error(profileUpdateError.message)
        await fetchCurrentUser({ load: false })
        toast.success('Categories updated')
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        toast.error(msg)
      } finally {
        setIsSubmitting(false)
      }
    }
  })

  const { data: profile } = useQuery<{ categories?: string[] } | null>({
    queryKey: ['creator-profile', currentUser?.id],
    enabled: !!currentUser?.id,
    queryFn: async () => {
      const p = await supabaseService.getDB<{ categories?: string[] }>(
        'user_profile',
        { filters: { userId: currentUser?.id || '' }, single: true }
      )
      return (p as { categories?: string[] } | null) || null
    }
  })
  const current =
    (profile as { categories?: string[] } | null)?.categories || []
  const selected: string[] = values.categories
  const toggle = async (name: string) => {
    const next = selected.includes(name)
      ? selected.filter(v => v !== name)
      : [...selected, name]
    setFieldValue('categories', next)
    try {
      setIsSaving(true)
      const userId = currentUser?.id || ''
      if (!userId) return
      const { data: existing, error: existingError } =
        await supabaseService.client
          .from('user_profile')
          .select('id')
          .eq('userId', userId)
          .maybeSingle()
      if (existingError) throw new Error(existingError.message)
      if (existing?.id) {
        const { error } = await supabaseService.client
          .from('user_profile')
          .update({ categories: next })
          .eq('id', existing.id)
        if (error) throw new Error(error.message)
      } else {
        const { error } = await supabaseService.client
          .from('user_profile')
          .insert({ userId, categories: next })
        if (error) throw new Error(error.message)
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      toast.error(msg)
    } finally {
      setIsSaving(false)
    }
  }
  if (values.categories.length === 0 && current.length > 0) {
    setFieldValue('categories', current)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const userId = currentUser?.id || null
        if (!userId) return
        const { data, error } = await supabaseService.client
          .from('users')
          .select('visibility')
          .eq('id', userId)
          .maybeSingle()
        if (!error && data) {
          setProfileVisible(Boolean(data.visibility))
        }
      } catch {}
    })()
  }, [currentUser?.id])

  return (
    <div className='font-sans'>
      <div className='pr-10'>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Categories
        </h2>
        <p className='mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
          Select your content categories.
        </p>
      </div>

      <div className='mt-6 md:max-w-[640px] space-y-6'>
        <div className='mt-2 w-full'>
          <div className=' flex flex-wrap gap-3'>
            {creatorCategories.map(name => {
              const isSelected = selected.includes(name)
              return (
                <button
                  key={name}
                  type='button'
                  role='button'
                  aria-pressed={isSelected}
                  onClick={() => toggle(name)}
                  className={`px-4 py-2 rounded-full capitalize text-[14px] md:text-[16px] border-[0.5px] transition-all duration-300 active:opacity-80 hover:opacity-80 ${
                    isSelected
                      ? 'bg-primary border-primary text-white transform origin-center rotate-[-6deg] md:rotate-[-4deg]'
                      : 'bg-white border-[#AEA9B1] text-black'
                  }`}
                >
                  {name}
                </button>
              )
            })}
          </div>
          {touched.categories && errors.categories ? (
            <p className='text-[12px] text-red-500'>
              {String(errors.categories)}
            </p>
          ) : null}
        </div>

        <SettingsCard
          title='Profile Visibility'
          subtitle='Show your profile to brands'
          checked={profileVisible}
          onChange={() => {
            const next = !profileVisible
            setProfileVisible(next)
            persistVisibility(next)
          }}
        />
      </div>
    </div>
  )
}

export default CreatorsDashboard
