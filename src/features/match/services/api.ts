import { supabase } from '@/shared/lib/supabase'
import type {
  Country,
  Match,
  MatchDetail,
  MatchInsert,
  MatchUpdate,
  PredictionUpsert,
} from '../models/match.types'

export const getMatches = async (playerId: string): Promise<Match[]> => {
  const { data, error } = await supabase
    .from('wc_matches')
    .select(
      `*, home_team:wc_countries!wc_matches_home_team_id_fkey (id, name, code), away_team:wc_countries!wc_matches_away_team_id_fkey (id, name, code),
      predictions:wc_predictions!left (*)`
    )
    .eq('wc_predictions.player_id', playerId)
    .eq('status', 'live')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })

  if (error) throw new Error(error.message)

  return data
    .map((match) => ({
      ...match,
      prediction: match.predictions.length
        ? {
            ...match.predictions[0],
            predicted_score_home:
              match.predictions[0].predicted_score?.split('-')[0],
            predicted_score_away:
              match.predictions[0].predicted_score?.split('-')[1],
          }
        : {
            predicted_winner: '',
            predicted_total_goals: null,
            predicted_first_team_to_score: '',
            predicted_first_player_to_score: '',
            predicted_score_home: '',
            predicted_score_away: '',
            predicted_total_yellow_cards: null,
            predicted_shots_on_target_home: null,
            predicted_shots_on_target_away: null,
          },
    }))
    .map(({ predictions, ...match }) => match)
}

export const upsertPrediction = async (
  prediction: PredictionUpsert
): Promise<void> => {
  const { error } = await supabase.from('wc_predictions').upsert(prediction, {
    onConflict: 'player_id,match_id',
    ignoreDuplicates: false,
  })

  if (error) throw new Error(error.message)
}

export const getAllMatches = async (): Promise<MatchDetail[]> => {
  const { data, error } = await supabase.rpc('wc_get_all_matches')
  if (error) throw new Error(error.message)
  return data
}

export const updateMatch = async (match: MatchUpdate): Promise<void> => {
  const { error } = await supabase
    .from('wc_matches')
    .update(match)
    .eq('id', match.id!)
    .select()

  if (error) throw new Error(error.message)
}

export const getCountries = async (): Promise<Country[]> => {
  const { data, error } = await supabase
    .from('wc_countries')
    .select()
    .order('name', { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export const insertMatch = async (match: MatchInsert): Promise<void> => {
  const { error } = await supabase.from('wc_matches').insert(match).select()
  if (error) throw new Error(error.message)
}
