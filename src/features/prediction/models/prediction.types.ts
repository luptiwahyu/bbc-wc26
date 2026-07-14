import { MatchDetail } from '@/features/match/models/match.types'

export interface PredictionWithMatch {
  prediction_id: string
  predicted_winner: string | null
  predicted_winner_name: string | null
  predicted_total_goals: number | null
  predicted_total_yellow_cards: number | null
  predicted_first_player_to_score: string | null
  predicted_first_team_to_score: string | null
  predicted_first_team_to_score_name: string | null
  predicted_first_throw_in: string | null
  predicted_first_throw_in_name: string | null
  predicted_score: string | null
  match: MatchDetail
}

export type PredictionsByPlayer = {
  player_id: string
  player_name: string
  predictions: PredictionWithMatch[]
}
