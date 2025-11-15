import Image from 'next/image'

const FeaturesSection = () => {
  return (
    <div>
      <div className=' max-w-[1100px] px-6 relative z-20 mx-auto flex flex-col justify-center items-center'>
        <div className=' w-full text-center text-[18px] font-normal italic text-black tracking-wide'>
          <span>
            We create opportunities for creators to showcase their talents while
            helping brands connect with the right voices. Creators enjoy the
            freedom to work remotely while shaping the future of digital
            storytelling.
          </span>
        </div>
      </div>

      <div className=' mt-20 flex flex-col justify-center items-center'>
        <h2 className=' text-[24px] md:text-[32px] font-bold text-black  tracking-tighter'>
          Features You Will Love.
        </h2>
        <div className=' mt-10 w-full max-w-[1100px] px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center'>
          {items.map(item => (
            <FeatureItem key={item.heading} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

const FeatureItem = ({
  image,
  heading,
  text
}: {
  image: string
  heading: string
  text: string
}) => {
  return (
    <article className=' group flex flex-col items-center text-center max-w-[360px] transition-transform duration-200 ease-out hover:scale-[1.02] focus-within:scale-[1.02]'>
      <div className=' flex items-center justify-center'>
        <Image
          src={image}
          alt={heading}
          height={160}
          width={160}
          className=' w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] object-contain'
        />
      </div>
      <h3 className=' mt-4 text-black font-semibold text-[16px] md:text-[18px]'>
        {heading}
      </h3>
      <p className=' mt-2 text-text-color-200 text-[14px] leading-[22px] md:text-[16px] md:leading-[24px] max-w-[320px]'>
        {text}
      </p>
    </article>
  )
}

const items = [
  {
    image: '/feature-1.svg',
    heading: 'Local & Authentic',
    text: 'Our creators are based right here in Nigeria—local voices delivering authentic, city-savvy content for your brand.'
  },
  {
    image: '/feature-2.svg',
    heading: 'Direct Access',
    text: 'Connect directly with creators. No middlemen, no delays—start real conversations instantly.'
  },
  {
    image: '/feature-3.svg',
    heading: 'Tailored for Your Brand',
    text: 'Browse by category to find the perfect creator. Fast, focused, and aligned with your brand’s needs.'
  }
]

export default FeaturesSection
