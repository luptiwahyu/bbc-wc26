import { supabase } from '@/shared/lib/supabase'
import { Match } from '../models/match.types'

export const getMatches = async (playerId: string): Promise<Match[]> => {
  const { data, error } = await supabase
    .from('wc_matches')
    .select(
      `*, home_team:wc_countries!wc_matches_home_team_id_fkey (id, name, code), away_team:wc_countries!wc_matches_away_team_id_fkey (id, name, code),
      predictions:wc_predictions!left (id, player_id, predicted_winner)`
    )
    .eq('wc_predictions.player_id', playerId)

  if (error) throw new Error(error.message)

  return data
    .map((match) => ({
      ...match,
      prediction: match.predictions?.[0] ?? null,
    }))
    .map(({ predictions, ...match }) => match)
}
