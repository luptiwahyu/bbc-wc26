import { Database } from '@/shared/models/database.types'

type MatchesTable = Database['public']['Tables']['wc_matches']

type CountriesTable = Database['public']['Tables']['wc_countries']

type PredictionsTable = Database['public']['Tables']['wc_predictions']

export type MatchStatus = Database['public']['Enums']['wc_match_status']

export type MatchRow = MatchesTable['Row']

export type MatchInsert = MatchesTable['Insert']

export type MatchUpdate = MatchesTable['Update']

export type Country = CountriesTable['Row']

export type PredictionRow = PredictionsTable['Row']

export type PredictionUpsert = PredictionsTable['Insert']

export interface Match extends MatchRow {
  home_team: Partial<Country>
  away_team: Partial<Country>
  prediction: Partial<PredictionRow>
}

export interface MatchDetail extends MatchRow {
  home_team: Partial<Country>
  away_team: Partial<Country>
}

export interface MatchForm extends MatchDetail {
  form_status: MatchStatus
  form_result_winner?: string | null
  form_result_total_goals?: string | null
  form_result_first_team_to_score?: string | null
}

export interface MatchCreateForm {
  home_team_id: string
  away_team_id: string
  date: string
  time: string
  status: MatchStatus
}
