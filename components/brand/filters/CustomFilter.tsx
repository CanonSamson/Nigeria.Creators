import DropdownBase from './DropdownBase'

export type CustomOption = { id: string; label: string; value: boolean }

export type CustomFilterProps = {
  label?: string
  options: CustomOption[]
  onChange?: (value: CustomOption[]) => void
}

export default function CustomFilter ({
  label = 'More',
  options,
  onChange
}: CustomFilterProps) {
  const toggle = (opt: CustomOption) => {
    const next = options.map(o =>
      o.id === opt.id ? { ...o, value: !o.value } : o
    )
    onChange?.(next)
  }
  return (
    <DropdownBase label={label}>
      <div className='flex flex-wrap gap-2'>
        {options.map(o => (
          <button
            key={o.id}
            type='button'
            className='flex items-center gap-2'
            role='menuitem'
            data-focusable='true'
            onClick={() => toggle(o)}
          >
            <div
              className={`relative w-9 h-5 rounded-full ${
                o.value ? 'bg-primary' : 'bg-[#EAEAEA]'
              }`}
              aria-pressed={o.value}
              aria-label={o.label}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                  o.value ? 'left-[18px]' : 'left-0.5'
                }`}
              />
            </div>
            <span className='text-[13px]'>{o.label}</span>
          </button>
        ))}
      </div>
    </DropdownBase>
  )
}
