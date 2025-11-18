import ProviderWrapper from '@/context/ProviderWrapper'
import WaitListModal from '../modals/WaitListModal'

export default function CustomRootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <ProviderWrapper>
        {children}
        <WaitListModal />
      </ProviderWrapper>
    </>
  )
}
