import ProviderWrapper from '@/context/ProviderWrapper'
import WaitListModal from '../modals/WaitListModal'
import CreatorProfileModal from '../modals/CreatorProfileModal'

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
        <CreatorProfileModal />
      </ProviderWrapper>
    </>
  )
}
