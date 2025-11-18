import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  text: string
  color?: string
  type?: 'outline' | 'solid' | 'button'
  buttonType?: 'button' | 'submit' | 'reset'
  isSubmit?: boolean
}

const Button = ({
  className,
  text,
  color,
  type,
  buttonType = 'button',
  isSubmit = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={isSubmit}
      {...props}
      type={buttonType}
      className={cn(
        'w-full active:scale-95 font-sans rounded-[12px] text-[14px] items-center transition-all justify-center py-4 font-light flex gap-2',
        color ? color : 'bg-primary hover:bg-primary-dark duration-300',
        type === 'outline'
          ? cn(
              color
                ? color
                : 'border-primary text-primary bg-bg-transparent hover:bg-bg-transparent',
              'border bg-transparent duration-500'
            )
          : 'text-white',
        className
      )}
    >
      {text}
      {isSubmit ? (
        <AiOutlineLoading3Quarters
          name='loading'
          size={20}
          className=' animate-spin'
        />
      ) : null}
    </button>
  )
}

export default Button
