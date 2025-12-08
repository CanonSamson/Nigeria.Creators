import DropdownBase from './DropdownBase'

export type CategoriesFilterProps = {
  options: string[]
  onChange?: (value: string[]) => void
}

export default function CategoriesFilter ({ options, onChange }: CategoriesFilterProps) {
  const onSelect = (opt: string) => {
    onChange?.([opt])
  }
  return (
    <DropdownBase label='Categories'>
      <div className='flex flex-wrap gap-2'>
        {options.map(o => (
          <button
            key={o}
            type='button'
            className='inline-flex items-center h-9 px-4 rounded-full border border-[#EAEAEA] bg-white justify-center text-[13px]'
            role='menuitem'
            data-focusable='true'
            onClick={() => onSelect(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </DropdownBase>
  )
}
