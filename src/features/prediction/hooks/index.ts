import { useQuery } from '@tanstack/react-query'
import { PredictionsByPlayer } from '../models/prediction.types'
import { getPredictionsGroupedByPlayer } from '../services/api'

export const predictionsKey = {
  all: ['all-predictions'] as const,
  grouped: () => [...predictionsKey.all, 'grouped'] as const,
}

export function usePredictions() {
  return useQuery<PredictionsByPlayer[], Error>({
    queryKey: predictionsKey.grouped(),
    queryFn: getPredictionsGroupedByPlayer,
  })
}
