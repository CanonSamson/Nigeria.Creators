const NotificationIcon = ({
  size = '24',
  stroke = '#303030'
}: {
  size?: string
  stroke?: string
}) => {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <path
        d='M12 6.43994V9.76994'
        stroke={stroke}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
      />
      <path
        d='M20.5899 15.17C21.3199 16.39 20.7399 17.97 19.3899 18.42C14.6099 20.01 9.43993 20.01 4.65993 18.42C3.21993 17.94 2.66993 16.48 3.45993 15.17L4.72993 13.05C5.07993 12.47 5.35993 11.44 5.35993 10.77V8.67C5.35993 4.98 8.33993 2 12.0199 2C15.6799 2 18.6799 5 18.6799 8.66V10.76C18.6799 10.94 18.6999 11.14 18.7299 11.35'
        stroke={stroke}
        stroke-width='1.5'
        stroke-miterlimit='10'
        stroke-linecap='round'
      />
      <path
        d='M15.3299 18.8198C15.3299 20.6498 13.8299 22.1498 11.9999 22.1498C11.0899 22.1498 10.2499 21.7698 9.64992 21.1698C9.04992 20.5698 8.66992 19.7298 8.66992 18.8198'
        stroke={stroke}
        stroke-width='1.5'
        stroke-miterlimit='10'
      />
    </svg>
  )
}

export default NotificationIcon
