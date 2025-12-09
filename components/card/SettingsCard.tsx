import { Switch } from "@/components/ui/switch"

const  SettingsCard =  ({
    title,
    subtitle,
    checked,
    onChange
  }: {
    title: string
    subtitle: string
    checked: boolean
    onChange: () => void
  }) => {
    return ( 
          <div className='w-full rounded-[16px] border border-[#EFEFEF] bg-white px-5 py-4 flex items-center justify-between'>
      <div>
        <p className='text-[16px] md:text-[18px] font-medium text-black'>
          {title}
        </p>
        <p className='text-[12px] md:text-[14px] text-text-color-200'>
          {subtitle}
        </p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
     );
}
 
export default SettingsCard;
