'use client'
import SolutionDemoCard from '../cards/SolutionDemoCard'

const BrandBusinessSolutionsSection = () => {
  return (
    <div>
      <div className=' mt-20 flex flex-col justify-center items-center'>
        <div className=' mx-auto  flex flex-col items-center'>
          <h2 className=' text-[32px] md:text-[48px] font-bold text-black tracking-tighter'>
            Business Solutions
          </h2>
          <p className=' mt-4 text-text-color-200 text-[16px] md:text-[20px]'>
            Turn creator partnerships into measurable business growth with real
            performance insights.
          </p>
        </div>

        <div className=' mt-10 w-full max-w-[1100px]  grid grid-cols-1 sm:grid-cols-2 gap-10 '>
          <SolutionDemoCard
            title={
              <>
                Demo Video <br /> for Brands
              </>
            }
            imageSrc='/demo.png'
            buttonType='primary'
       
          />
          <SolutionDemoCard
            title={
              <>
                Demo Video <br /> for Creators
              </>
            }
            buttonType='play-icon'
  
            imageSrc='/demo.png'
            showButtonOnHover={true}
          />
        </div>
      </div>
    </div>
  )
}

export default BrandBusinessSolutionsSection
