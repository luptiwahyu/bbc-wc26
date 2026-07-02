import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Match,
  MatchDetail,
  MatchUpdate,
  PredictionUpsert,
} from '../models/match.types'
import {
  getAllMatches,
  getMatches,
  updateMatch,
  upsertPrediction,
} from '../services/api'
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

export const useAllMatches = () => {
  return useQuery<MatchDetail[], Error>({
    queryKey: ['all-matches'],
    queryFn: () => getAllMatches(),
  })
}

export const useUpdateMatch = () => {
  return useMutation<void, Error, MatchUpdate>({
    mutationFn: updateMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-matches'] })
    },
  })
}
