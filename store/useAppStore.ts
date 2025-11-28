import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AppStore = {
  count: number
  resetStore: () => void
}

const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      count: 0,
      resetStore: () => {
        set({
          count: 0,
        })
      },
    }),
    { name: 'nigeria-creators-app-storage' }
  )
)

export default useAppStore
