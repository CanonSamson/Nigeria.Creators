'use client'

import DashboardSideBar from '@/components/dashboard-sidebar'
import { cn } from '@/lib/utils'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import CategoryTabs from '@/components/brand/CategoryTabs'
import FilterBar from '@/components/brand/FilterBar'
import CreatorCard from '@/components/brand/card/CreatorCard'

const BrandDashboard = () => {
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )

  console.log(currentUser?.id)

  return (
    <div
      className={cn(
        'min-h-[100dvh] flex  items-start justify-start w-full font-sans',
        '!min-h-[100dvh]'
      )}
    >
      <div
        className={cn(
          'min-h-[100dvh] flex items-start   overflow-x-hidden justify-start w-full max-w-[1200px] mx-auto ',
          '!min-h-[100dvh]'
        )}
      >
        <DashboardSideBar />
        <div
          className={cn(
            'pb-[100px] md:max-w-[80%] md:w-full  min-[800px]:max-w-[1200px] w-full flex-1 mx-auto'
          )}
        >
          <header className={'mt-4 mb-2'}>
           <div className=' max-md:px-2'>
             <h1 className='text-[28px] md:text-[34px] font-bold text-black'>
              Welcome, Canon
            </h1>
            <p className='mt-2 text-[#40444C] text-[14px] md:text-[16px]'>
              Find creative content creators ready to work with your brand
            </p>
           </div>
            <CategoryTabs
              categories={[
                'Women’s Health',
                'Women’s Health',
                'Women’s Health',
                'Women’s Health',
                'Women’s Health'
              ]}
            />
            <div className=' w-full py-6'>
              <span className=' w-full h-[1px] bg-[#DFDFDF] flex' />
            </div>
            <FilterBar />
          </header>
          <section className={'grid grid-cols-1  px-2 gap-6 md:grid-cols-1'}>
            {sampleCreators.map(c => (
              <CreatorCard key={c.name + c.image} {...c} />
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}

export default BrandDashboard

const sampleCreators = [
  {
    name: 'Martina Levi',
    about:
      "I'm passionate about creating content that inspires—sharing lifestyle, wellness, and motivational videos with Nigeria based women in their early 20s",
    image: '/images/d1852f09-82e1-42c5-bc82-9b204b6131de 1.png',
    category: "Women's Health",
    tags: ['KE', 'NG', 'DE', 'NL', 'GB'],
    location: 'Abuja'
  },
  {
    name: 'Favor',
    about:
      "I'm passionate about creating content that inspires—sharing lifestyle, wellness, and motivational videos with Nigeria based women in their early 20s",
    image: '/images/Gemini_Generated_Image_utglu6utglu6utgl.png',
    category: "Women's Health",
    tags: ['KE', 'NG', 'DE', 'NL', 'GB'],
    location: 'Jos'
  },
  {
    name: 'Martina Levi',
    about:
      "I'm passionate about creating content that inspires—sharing lifestyle, wellness, and motivational videos with Nigeria based women in their early 20s",
    image: '/images/Gemini_Generated_Image_fex70ofex70ofex7.png',
    category: "Women's Health",
    tags: ['KE', 'NG', 'DE', 'NL', 'GB'],
    location: 'Abuja'
  },
  {
    name: 'Martina Levi',
    about:
      "I'm passionate about creating content that inspires—sharing lifestyle, wellness, and motivational videos with Nigeria based women in their early 20s",
    image: '/user-3.png',
    category: "Women's Health",
    tags: ['KE', 'NG', 'DE', 'NL', 'GB'],
    location: 'Lagos'
  }
]
