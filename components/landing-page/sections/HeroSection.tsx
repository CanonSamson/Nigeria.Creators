import Image from 'next/image'
import HeroSectionDetails from './hero/Details'

const HeroSection = () => {
  return (
    <header className='  w-full overflow-hidden'>
      <div className=' mt-[100px] max-w-[1300px] mx-auto w-full pb-[150px] md:pb-[300px] relative h-full'>
        <div className='absolute inset-0  overflow-visible pointer-events-none select-none '>
          <Image
            src='/hero/2.png'
            alt='Creator'
            height={200}
            width={200}
            className='absolute rounded-[20px] object-cover shadow-lg  w-[7rem] h-[8rem] md:w-[10rem] md:h-[13rem] left-[2%] md:left-[4%] top-6 sm:top-12'
          />

          <Image
            src='/hero/6.png'
            alt='Creator'
            height={200}
            width={200}
            className='absolute hidden md:block rounded-[20px] object-cover shadow-lg left-[1%] w-[7rem] h-[8rem] md:left-[2%] top-[220px] md:top-[300px] md:w-[10rem] md:h-[13rem]'
          />

          <Image
            src='/hero/7.png'
            alt='Creator'
            height={200}
            width={200}
            className='absolute rounded-[20px] object-cover shadow-lg left-[6%] w-[7rem] h-[8rem] md:left-[13%] top-[30rem] md:top-[400px] md:w-[10rem] md:h-[13rem]'
          />
          <Image
            src='/hero/8.png'
            alt='Creator'
            height={200}
            width={200}
            className='absolute rounded-[20px] object-cover shadow-lg  w-[7rem] h-[8rem] left-[15%] md:left-[26%] top-[32rem] md:top-[500px] md:w-[10rem] md:h-[13rem]'
          />
        </div>
        <div className='absolute inset-0 overflow-visible pointer-events-none select-none '>
          <Image
            src='/hero/4.png'
            alt='Creator'
            height={200}
            width={200}
            className='absolute rounded-[20px] object-cover shadow-lg right-[3%]  md:right-[8%] top-6 sm:top-12 w-[7rem] h-[8rem] md:w-[12rem] md:h-[16rem]'
          />

          <Image
            src='/hero/1.png'
            alt='Creator'
            height={200}
            width={200}
            className='absolute hidden  md:block rounded-[20px] object-cover shadow-lg right-[-8px] w-[7rem] h-[8rem] md:right-[-20px] top-[220px] md:top-[300px] md:w-[203px] md:h-[204px]'
          />

          <Image
            src='/hero/3.png'
            alt='Creator'
            height={200}
            width={200}
            className='absolute rounded-[20px]  object-cover shadow-lg right-[5%] top-[460px] md:top-[550px] w-[7rem] h-[8rem] md:w-[10rem] md:h-[12rem]'
          />

          <Image
            src='/hero/5.png'
            alt='Creator'
            height={200}
            width={200}
            className='absolute rounded-[20px] object-cover shadow-lg right-[10%] top-[520px] md:top-[40rem] w-[10rem] h-[8rem] md:w-[18rem] md:h-[10rem]'
          />
        </div>
        <HeroSectionDetails />
      </div>
    </header>
  )
}

export default HeroSection
