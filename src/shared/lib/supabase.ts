import { createClient } from '@supabase/supabase-js'
import SecureStorage from './secure-storage'
import { Database } from '../models/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string

const storage = new SecureStorage()

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: {
      setItem: storage.set,
      getItem: storage.get,
      removeItem: storage.remove,
    },
  },
})
