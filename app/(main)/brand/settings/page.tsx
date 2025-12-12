'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { supabaseService } from '@/utils/supabase/services'
import { categories as brandCategories } from '@/utils/options'
import { useQuery } from '@tanstack/react-query'

const schema = Yup.object({
  categories: Yup.array()
    .of(Yup.string())
    .min(1, 'Select at least one')
    .required('Required')
})

export default function BrandGeneralSettingsPage () {
  const currentUser = useContextSelector(UserContext, state => state.currentUser)
  const [isSaving, setIsSaving] = useState(false)

  const formik = useFormik<{ categories: string[] }>({
    initialValues: { categories: [] },
    validationSchema: schema,
    onSubmit: () => {}
  })

  const { data: profile } = useQuery<{ categories?: string[] } | null>({
    queryKey: ['brand-profile', currentUser?.id],
    enabled: !!currentUser?.id,
    queryFn: async () => {
      const { data } = await supabaseService.client
        .from('brand_profile')
        .select('categories')
        .eq('userId', currentUser?.id || '')
        .limit(1)
      const row = (data || [])[0] as { categories?: string[] } | undefined
      return row || null
    }
  })

  useEffect(() => {
    const cats = Array.isArray((profile as any)?.categories)
      ? ((profile as any).categories as string[])
      : []
    formik.setFieldValue('categories', cats)
  }, [profile])

  const selected = formik.values.categories || []
  const toggle = async (name: string) => {
    const next = selected.includes(name)
      ? selected.filter(v => v !== name)
      : [...selected, name]
    formik.setFieldValue('categories', next)
    try {
      setIsSaving(true)
      const userId = currentUser?.id || ''
      if (!userId) return
      const { data: existing, error: existingError } = await supabaseService.client
        .from('brand_profile')
        .select('id')
        .eq('userId', userId)
        .maybeSingle()
      if (existingError) throw new Error(existingError.message)
      if (existing?.id) {
        const { error } = await supabaseService.client
          .from('brand_profile')
          .update({ categories: next })
          .eq('id', existing.id)
        if (error) throw new Error(error.message)
      } else {
        const { error } = await supabaseService.client
          .from('brand_profile')
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

  const { touched, errors } = formik

  return (
    <div className='font-sans'>
      <div className='pr-10'>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>General</h2>
        <p className='mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
          Choose the categories that best describe your brand’s niche.
        </p>
      </div>

      <div className='mt-6 md:max-w-[640px] space-y-6'>
        <div className='flex flex-wrap gap-3'>
          {brandCategories.map(name => {
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
          <p className='text-[12px] text-red-500'>{String(errors.categories)}</p>
        ) : null}

        
      </div>
    </div>
  )
}
