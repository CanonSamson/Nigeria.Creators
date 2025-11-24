import { createClient, SupabaseClient } from '@supabase/supabase-js'

export class SupabaseService {
  client: SupabaseClient
  constructor () {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string
    const key =
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string) ||
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)
    this.client = createClient(url, key)
  }

  async uploadFile (
    bucket: string,
    path: string,
    file: File | Blob,
    options?: { upsert?: boolean; cacheControl?: string }
  ): Promise<{ path?: string; error?: string }> {
    const { data, error } = await this.client.storage
      .from(bucket)
      .upload(path, file, {
        upsert: options?.upsert ?? true,
        cacheControl: options?.cacheControl ?? '3600'
      })
    if (error) return { error: error.message }
    return { path: data?.path }
  }

  getPublicUrl (bucket: string, path: string): string | null {
    const { data } = this.client.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl || null
  }

  insertDB = async <T extends Record<string, unknown>>(
    table: 'creators-join-request' | 'wait_list',
    data: T,
    id?: string
  ): Promise<T> => {
    const payload = id ? { ...data, id } : data
    const { data: inserted, error } = await this.client
      .from(table)
      .insert(payload)
      .select()
      .single()
    if (error) throw new Error(error.message)
    return inserted as T
  }
}

export const supabaseService = new SupabaseService()
