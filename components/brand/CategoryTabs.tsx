import { cn } from '@/lib/utils'

type Props = {
  categories: string[]
}

export default function CategoryTabs ({ categories }: Props) {
  return (
    <div className='w-full overflow-x-auto max-md:px-2 scroll-smooth'>
      <div className='flex flex-nowrap md:flex-wrap gap-2 mt-4 min-w-max'>
        {categories.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className={cn(
              'px-3 py-2 rounded-full border text-[12px] md:text-[13px]',
              'bg-white border-[#EAEAEA] text-black'
            )}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
