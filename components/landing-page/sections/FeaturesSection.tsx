import Image from 'next/image'

const FeaturesSection = () => {
  return (
    <div>
      <div className=' max-w-[1100px] relative z-20 mx-auto   flex flex-col justify-center items-center'>
        <div>
          <span>
            We create opportunities for creators to showcase their talents while
            helping brands connect with the right voices. Creators enjoy the
            freedom to work remotely while shaping the future of digital
            storytelling.
          </span>
        </div>
      </div>

      <div>   
        <h2>Features You Will Love.</h2>
        <div>
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
    <div>
      <Image
        src={image}
        alt={heading}
        height={60}
        width={60}
        className=' w-[40px] h-[40px] rounded-full object-cover'
      />
      <div>
        <h3>{heading}</h3>
        <p>{text}</p>
      </div>
    </div>
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
