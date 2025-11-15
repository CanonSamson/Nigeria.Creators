import Navbar from '@/components/navigation/Navbar'
import CreatorsListSection from '@/components/landing-page/sections/CreatorsListSection'
import FAQSection from '@/components/landing-page/sections/FAQSection'
import Footer from '@/components/landing-page/sections/Footor'

export default function Home () {
  return (
    <div className='font-sans min-h-screen'>
      <Navbar />

      <header className='  w-full overflow-hidden'>
        <div className=' mt-[100px] max-w-[1300px] mx-auto w-full pb-[00px] md:pb-[300px] relative h-full'>
          <div className=' max-w-[750px] relative z-20 mx-auto  min-h-[600px]  flex flex-col justify-center items-center'>
            <div className=' text-center flex  flex-col'>
              <h1 className=' font-extrabold  tracking-tighter text-[60px] leading-none '>
                Where Growth Starts with Creators
              </h1>
              <p className=' max-w-[700px] tracking-tight mx-auto mt-[14px] text-text-color-200 font-medium text-[20px] leading-[30px]'>
                Partner with creators who turn content into conversions and help
                brands grow through real performance
              </p>

              <div className=' flex mt-[26px] justify-center gap-4'>
                <button className=' text-[18px] tracking-tight  h-[60px] px-4 rounded-[16px] bg-primary text-white font-semibold'>
                  Book Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <CreatorsListSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
