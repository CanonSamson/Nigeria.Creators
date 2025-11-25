'use client'

import { useFormikContext } from 'formik'

const categories = [
  'Tech',
  'Cooking',
  'Family',
  'Day in a life',
  'Fashion & Beauty',
  'UGC',
  'Health & Wellness',
  'Travel',
  'Women’s Health',
  'Faith & Motivation',
  'Art & Creativity',
  'Business & Finance',
  'Travel & Culture',
  'Others'
]

const CategorySection = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext<{
    categories: string[]
  }>()
  const selected: string[] = values.categories || []

  const toggle = (name: string) => {
    const next = selected.includes(name)
      ? selected.filter(v => v !== name)
      : [...selected, name]
    setFieldValue('categories', next)
  }
  return (
    <>
      <div className='mt-4 w-full'>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          {' '}
          Select your content categories
        </h2>
        <p className='mt-2 text-text-color-200 text-[14px] md:text-[16px]'>
          Choose what best describes your niche.
        </p>
      </div>

      <div className='mt-6 w-full space-y-6'>
        <div className=' flex flex-wrap gap-3'>
          {categories.map(name => {
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
    </>
  )
}

export default CategorySection
