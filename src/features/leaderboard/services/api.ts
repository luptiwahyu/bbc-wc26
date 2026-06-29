import { supabase } from '@/shared/lib/supabase'
import { Leaderboard } from '../models/leaderboard.types'

export const getLeaderboard = async (): Promise<Leaderboard[]> => {
  const { data, error } = await supabase.from('wc_leaderboard').select()
  if (error) throw new Error(error.message)
  return data
}
