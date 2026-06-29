import { useMutation, useQuery } from '@tanstack/react-query'
import { Match, PredictionUpsert } from '../models/match.types'
import { getMatches, upsertPrediction } from '../services/api'
import { queryClient } from '@/shared/lib/utils'

export const useMatches = (playerId: string) => {
  return useQuery<Match[], Error>({
    queryKey: ['matches'],
    queryFn: () => getMatches(playerId),
  })
}

export const useUpsertPrediction = () => {
  return useMutation<void, Error, PredictionUpsert>({
    mutationFn: upsertPrediction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] })
    },
  })
}
