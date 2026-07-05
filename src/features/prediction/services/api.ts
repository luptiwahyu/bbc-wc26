import { supabase } from '@/shared/lib/supabase'
import { PredictionsByPlayer } from '../models/prediction.types'

export const getPredictionsGroupedByPlayer = async (): Promise<
  PredictionsByPlayer[]
> => {
  const { data, error } = await supabase.rpc(
    'wc_get_predictions_grouped_by_player'
  )

  if (error) throw new Error(error.message)
  return data as PredictionsByPlayer[]
}
