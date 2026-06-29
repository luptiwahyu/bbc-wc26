import { supabase } from '@/shared/lib/supabase'
import { Player } from '../models/player.types'

export const getPlayers = async (): Promise<Player[]> => {
  const { data, error } = await supabase
    .from('wc_players')
    .select()
    .order('name', { ascending: true })

  if (error) throw new Error(error.message)
  return data
}
