import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className=' px-4 fixed w-full top-0 right-0 z-[40]'>
      <div className='  font-inter mx-auto w-full mt-[26px] max-w-[583px] items-center border border-[#EFEFEF] sticky top-0 flex justify-between bg-[#F8F8F8]  rounded-[20px] p-[14px]'>
        <Link href='/'>
          <Image
            src='/logo/v1.png'
            alt='Nigeria Creators'
            height={100}
            width={100}
            className='  h-[50px] w-[50px] object-center object-cover rounded-[16px]'
          />
        </Link>

        <nav>
          <ul className=' inline-flex font font-medium  gap-[16px]'>
            <li>
              <Link href='/creators'>Creators</Link>
            </li>
            <li>
              <Link href='/brands'>Brands</Link>
            </li>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </nav>
        <div>
          <button className=' h-[50px] bg-primary text-white font-medium rounded-[16px] px-4 py-2'>
            I&apos;m a Brand
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
