import { supabase } from '@/shared/lib/supabase'
import { Leaderboard } from '../models/leaderboard.types'

export const getLeaderboard = async (): Promise<Leaderboard[]> => {
  const { data, error } = await supabase
    .from('wc_leaderboard')
    .select()
    .order('points', { ascending: false })
    .order('win', { ascending: false })
    .order('played', { ascending: false })
    .order('player_name', { ascending: true })

  if (error) throw new Error(error.message)
  return data
}
