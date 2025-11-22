'use client'

import { useState } from 'react'


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
      const [selected, setSelected] = useState<string[]>([])
    
      const toggle = (name: string) => {
        setSelected(prev =>
          prev.includes(name) ? prev.filter(v => v !== name) : [...prev, name]
        )
      }
    
  return (
    <div className='mt-6 max-w-[640px]'>
      <div className='flex flex-wrap gap-3'>
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
    </div>
  )
}

export default CategorySection
