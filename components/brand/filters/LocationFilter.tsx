import DropdownBase from './DropdownBase'
import { Search } from 'lucide-react'

export type LocationFilterProps = {
  onChange?: (value: string) => void
}

export default function LocationFilter ({ onChange }: LocationFilterProps) {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.currentTarget.value)
  }
  return (
    <DropdownBase label='Location'>
      <div className='block'>
        <div className='relative'>
          <Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA0A6]' />
          <input
            aria-label='Enter Location'
            placeholder='Enter Location'
            className='w-full h-10 border focus:border-primary border-[#EAEAEA] rounded-[12px] px-3 text-[14px] pl-9 outline-none '
            onChange={handle}
          />
        </div>
      </div>
    </DropdownBase>
  )
}
