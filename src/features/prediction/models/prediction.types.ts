import { MatchDetail } from '@/features/match/models/match.types'

export interface PredictionWithMatch {
  prediction_id: string
  predicted_winner: string | null
  predicted_winner_name: string | null
  predicted_total_goals: number | null
  match: MatchDetail
}

export type PredictionsByPlayer = {
  player_id: string
  player_name: string
  predictions: PredictionWithMatch[]
}
