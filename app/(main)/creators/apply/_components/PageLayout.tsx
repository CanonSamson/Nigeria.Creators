import { ReactNode } from 'react'

export default function PageLayout ({ children }: { children: ReactNode }) {
  return (
    <main className='w-full min-h-screen font-sans'>
      <div className='w-full flex-col flex  justify-center px-6 md:px-10'>
        <div className='mx-auto max-w-[1100px] w-full '>
          <header className='pt-[120px]  mx-auto flex items-center justify-center md:pt-[160px]'>
            <h1 className='text-[32px]  md:text-[56px] font-bold tracking-tighter text-black'>
              Apply to be a
              <span className='ml-3 inline-block align-middle bg-primary text-white px-10 py-1 md:px-10 md:py-2 leading-none'>
                Creator
              </span>
            </h1>
          </header>

          {children}
        </div>
      </div>
    </main>
  )
}
