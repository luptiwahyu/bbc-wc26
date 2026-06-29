import { Database } from '@/shared/models/database.types'

type MatchesTable = Database['public']['Tables']['wc_matches']

type CountriesTable = Database['public']['Tables']['wc_countries']

type PredictionsTable = Database['public']['Tables']['wc_predictions']

export type MatchRow = MatchesTable['Row']

export type Country = CountriesTable['Row']

export type PredictionRow = PredictionsTable['Row']

export type PredictionUpsert = PredictionsTable['Insert']

export interface Match extends MatchRow {
  home_team: Partial<Country>
  away_team: Partial<Country>
  prediction: Partial<PredictionRow>
}
