import Image from 'next/image'

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
          className='absolute rounded-[20px] object-cover shadow-lg left-[6%] w-[7rem] h-[8rem] md:left-[13%] top-[27rem] md:top-[400px] md:w-[10rem] md:h-[13rem]'
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
          className='absolute rounded-[20px]  object-cover shadow-lg right-[5%] top-[420px] md:top-[550px] w-[7rem] h-[8rem] md:w-[10rem] md:h-[12rem]'
        />

        <Image
          src='/hero/5.png'
          alt='Creator'
          height={200}
          width={200}
          className='absolute rounded-[20px] object-cover shadow-lg right-[10%] top-[520px] md:top-[40rem] w-[10rem] h-[8rem] md:w-[18rem] md:h-[10rem]'
        />
      </div>
      <div className=' max-w-[750px] relative z-20 mx-auto min-h-[600px]  md:min-h-[600px]  flex flex-col justify-center items-center'>
        <div className=' mb-[18px] md:mb-[26px] gap-2 bg-[#F6FFFD] p-2 flex items-center rounded-[12px] md:rounded-[20px]'>
          <div className='   flex items-center rounded-[12px] md:rounded-[20px]'>
            <Image
              src='/user-1.png'
              alt='Nigeria Creators'
              height={60}
              width={60}
              className=' w-[20px] h-[20px] md:w-[40px] md:h-[40px] rounded-full object-cover'
            />
            <div className=' relative ml-[-10px] md:ml-[-20px] flex items-center'>
              <Image
                src='/user-2.png'
                alt='Nigeria Creators'
                height={60}
                width={60}
                className=' w-[20px] h-[20px] md:w-[40px] md:h-[40px] rounded-full object-cover'
              />
            </div>
            <div className=' relative ml-[-10px] md:ml-[-20px] flex items-center'>
              <Image
                src='/user-3.png'
                alt='Nigeria Creators'
                height={60}
                width={60}
                className=' w-[20px] h-[20px] md:w-[40px] md:h-[40px] rounded-full object-cover'
              />
            </div>
          </div>
          <span className=' tracking-tight text-[12px] md:text-[16px] text-text-color-200'>
            1,026+ Nigeria Content Creators
          </span>
        </div>

        <div className=' text-center flex  flex-col'>
          <h1 className=' font-extrabold  tracking-tighter text-[36px] md:text-[60px] leading-none '>
            Connect with Nigeria&apos;s Content Creators.
          </h1>
          <p className=' max-w-[700px] tracking-tight mx-auto mt-[14px] text-text-color-200 font-medium leading-[24px]  text-[14px] md:text-[20px] md:leading-[30px]'>
            We connect brands with Nigeria&apos;s top content creators for
            authentic, engaging social media presence.
          </p>

          <div className=' flex mt-[26px] justify-center gap-4'>
            <button className='text-[14px] md:text-[18px] bg-white tracking-tight   h-[50px] md:h-[60px] px-4 rounded-[16px] border border-border-200 text-black font-semibold'>
              I&apos;m a Creator
            </button>
            <button className=' text-[14px] md:text-[18px] tracking-tight  h-[50px] md:h-[60px] px-4 rounded-[16px] bg-primary text-white font-semibold'>
              I&apos;m a Brand
            </button>
          </div>
        </div>
      </div>
      </div>
    </header>
  )
}

export default HeroSection
