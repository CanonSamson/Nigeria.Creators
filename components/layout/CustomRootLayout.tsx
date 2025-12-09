import ProviderWrapper from '@/context/ProviderWrapper'
import WaitListModal from '../modals/WaitListModal'
import CreatorProfileModal from '../modals/CreatorProfileModal'
import CategoryFilterModal from '../modals/CategoryFilterModal'
import BudgetFilterModal from '../modals/BudgetFilterModal'
import LocationFilterModal from '../modals/LocationFilterModal'
import MoreFilterModal from '../modals/MoreFilterModal'

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
        <CategoryFilterModal />
        <BudgetFilterModal />
        <LocationFilterModal />
        <MoreFilterModal />
      </ProviderWrapper>
    </>
  )
}
