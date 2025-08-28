
import Image from 'next/image'

const HeroSection = () => {
  return (
    <header className=' mt-[100px] relative h-full'>
      <div className='w-full h-[1000px] absolute overflow-hidden'>
        <Image
          src='/hero/2.png'
          alt='Creator'
          height={200}
          width={200}
          className=' h-[220px] w-[150px] absolute  left-[4%] top-[50px]  rounded-[20px] object-cover'
        />

        <Image
          src='/hero/6.png'
          alt='Creator'
          height={200}
          width={200}
          className=' h-[220px] w-[150px] absolute  left-[-20px] top-[300px]  rounded-[20px] object-cover'
        />

        <Image
          src='/hero/7.png'
          alt='Creator'
          height={200}
          width={200}
          className=' h-[220px] w-[150px] absolute  left-[100px] top-[400px]  rounded-[20px] object-cover'
        />
        <Image
          src='/hero/8.png'
          alt='Creator'
          height={200}
          width={200}
          className=' h-[220px] w-[150px] absolute  left-[260px] top-[500px]  rounded-[20px] object-cover'
        />
      </div>
      <div className='w-full h-[1000px] absolute overflow-hidden'>
        <Image
          src='/hero/4.png'
          alt='Creator'
          height={200}
          width={200}
          className=' h-[220px] w-[150px] absolute  right-[8%] top-[50px]  rounded-[20px] object-cover'
        />

        <Image
          src='/hero/1.png'
          alt='Creator'
          height={200}
          width={200}
          className=' h-[204px] w-[203px] absolute  right-[-20px] top-[300px]  rounded-[20px] object-cover'
        />

        <Image
          src='/hero/3.png'
          alt='Creator'
          height={200}
          width={200}
          className=' h-[197px] w-[162px]  absolute  right-[5%] top-[550px]  rounded-[20px] object-cover'
        />

        <Image
          src='/hero/5.png'
          alt='Creator'
          height={200}
          width={200}
          className=' w-[260px] h-[164px]  absolute  right-[10%] top-[650px]  rounded-[20px] object-cover'
        />
      </div>
      <div className=' max-w-[850px] relative z-20 mx-auto  min-h-[600px]  flex flex-col justify-center items-center'>
        <div className=' mb-[26px] gap-2 bg-[#F6FFFD] p-2 flex items-center rounded-[20px]'>
          <div className='   flex items-center rounded-[20px]'>
            <Image
              src='/user-1.png'
              alt='Nigeria Creators'
              height={60}
              width={60}
              className=' w-[40px] h-[40px] rounded-full object-cover'
            />
            <div className=' relative ml-[-20px] flex items-center'>
              <Image
                src='/user-2.png'
                alt='Nigeria Creators'
                height={60}
                width={60}
                className=' w-[40px] h-[40px] rounded-full object-cover'
              />
            </div>
            <div className=' relative ml-[-20px] flex items-center'>
              <Image
                src='/user-3.png'
                alt='Nigeria Creators'
                height={60}
                width={60}
                className=' w-[40px] h-[40px] rounded-full object-cover'
              />
            </div>
          </div>
          <span className=' text-text-color-200'>
            1,026+ Nigeria Content Creators
          </span>
        </div>

        <div className=' text-center flex  flex-col'>
          <h1 className=' font-extrabold  text-[60px] leading-[73px] '>
            Connect with Nigeria&apos;s Content Creators.
          </h1>
          <p className=' max-w-[700px] mx-auto mt-[14px] text-text-color-200 font-medium text-[20px] leading-[30px]'>
            We connect brands with Nigeria&apos;s top content creators for
            authentic, engaging social media presence.
          </p>

          <div className=' flex mt-[26px] justify-center gap-4'>
            <button className='text-[18px]  h-[60px] px-4 rounded-[16px] border border-border-200 text-black font-semibold'>
              I&apos;m a Creator
            </button>
            <button className=' text-[18px]  h-[60px] px-4 rounded-[16px] bg-primary text-white font-semibold'>
              I&apos;m a Brand
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeroSection
