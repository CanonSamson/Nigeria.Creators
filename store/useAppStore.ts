import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabaseService } from '@/utils/supabase/services'

export type AppStore = {
  count: number
  brandFilters: {
    categories: string[]
    defaultCategories: string[]
    others: boolean
    location?: string
    budgetRange?: { min?: number; max?: number }
  }
  toggleBrandCategory: (category: string) => void
  clearBrandFilters: () => void
  setBrandDefaultCategories: (categories: string[]) => void
  toggleOthersFilter: () => void
  loadBrandDefaultCategories: (userId: string) => Promise<void>
  setBrandLocation: (loc: string) => void
  setBrandBudgetRange: (range: { min?: number; max?: number }) => void
  hasActiveFilters: () => boolean
  resetStore: () => void
}

const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      count: 0,
      brandFilters: {
        categories: [],
        defaultCategories: [],
        others: false,
        location: undefined,
        budgetRange: undefined
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
          brandFilters: { categories: [], defaultCategories: [], others: false, location: undefined, budgetRange: undefined }
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
      setBrandLocation: (loc: string) => {
        set((state) => ({
          brandFilters: { ...state.brandFilters, location: loc }
        }))
      },
      setBrandBudgetRange: (range: { min?: number; max?: number }) => {
        set((state) => ({
          brandFilters: { ...state.brandFilters, budgetRange: range }
        }))
      },
      hasActiveFilters: () => {
        const filters = get().brandFilters
        return (
          (Array.isArray(filters.categories) && filters.categories.length > 0) ||
          !!filters.others ||
          (typeof filters.location === 'string' && filters.location.trim().length > 0) ||
          (!!filters.budgetRange &&
            (typeof filters.budgetRange.min === 'number' ||
              typeof filters.budgetRange.max === 'number'))
        )
      },
      resetStore: () => {
        set((state) => ({
          count: 0,
          brandFilters: {
            ...state.brandFilters,
            categories: [],
            defaultCategories: [],
            others: false
          }
        }))
      },
    }),
    { name: 'nigeria-creators-app-storage' }
  )
)

export default useAppStore
