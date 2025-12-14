import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabaseService } from '@/utils/supabase/services'

export type AppStore = {
  count: number
  brandFilters: {
    categories: string[]
    defaultCategories: string[]
    others: boolean
  }
  toggleBrandCategory: (category: string) => void
  clearBrandFilters: () => void
  setBrandDefaultCategories: (categories: string[]) => void
  toggleOthersFilter: () => void
  loadBrandDefaultCategories: (userId: string) => Promise<void>
  resetStore: () => void
}

const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      count: 0,
      brandFilters: {
        categories: [],
        defaultCategories: [],
        others: false
      },
      toggleBrandCategory: (category: string) => {
        set((state) => {
          const exists = state.brandFilters.categories.includes(category)
          const categories = exists
            ? state.brandFilters.categories.filter((c) => c !== category)
            : [...state.brandFilters.categories, category]
          return {
            brandFilters: { ...state.brandFilters, categories }
          }
        })
      },
      clearBrandFilters: () => {
        set({
          brandFilters: { categories: [], defaultCategories: [], others: false }
        })
      },
      setBrandDefaultCategories: (categories: string[]) => {
        set((state) => ({
          brandFilters: { ...state.brandFilters, defaultCategories: categories }
        }))
      },
      toggleOthersFilter: () => {
        set((state) => ({
          brandFilters: { ...state.brandFilters, others: !state.brandFilters.others }
        }))
      },
      loadBrandDefaultCategories: async (userId: string) => {
        if (!userId) return
        const { data } = await supabaseService.client
          .from('brand_profile')
          .select('categories')
          .eq('userId', userId)
          .limit(1)
        const row = (data || [])[0] as { categories?: string[] } | undefined
        const categories = Array.isArray(row?.categories) ? (row!.categories as string[]) : []
        set((state) => ({
          brandFilters: { ...state.brandFilters, defaultCategories: categories }
        }))
      },
      resetStore: () => {
        set({
          count: 0,
          brandFilters: { categories: [], defaultCategories: [], others: false }
        })
      },
    }),
    { name: 'nigeria-creators-app-storage' }
  )
)

export default useAppStore
