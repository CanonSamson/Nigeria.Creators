import { tables } from '@/types/supabase/table'

export type GetDBFn = {
  <T extends Record<string, unknown>>(
    table: tables,
    options?: {
      select?: string
      filters?: Record<string, unknown>
      single?: true
      limit?: number
    }
  ): Promise<T | null>
  <T extends Record<string, unknown>>(
    table: tables,
    options: {
      select?: string
      filters?: Record<string, unknown>
      single: false
      limit?: number
    }
  ): Promise<T[] | null>
  <T extends Record<string, unknown>>(
    table: tables,
    options?: {
      select?: string
      filters?: Record<string, unknown>
      single?: boolean
      limit?: number
    }
  ): Promise<T | T[] | null>
}
