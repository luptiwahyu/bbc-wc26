import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Country,
  Match,
  MatchDetail,
  MatchInsert,
  MatchUpdate,
  PredictionUpsert,
} from '../models/match.types'
import {
  getAllMatches,
  getCountries,
  getMatches,
  insertMatch,
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
    staleTime: 0,
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

export const useCountries = () => {
  return useQuery<Country[], Error>({
    queryKey: ['countries'],
    queryFn: getCountries,
  })
}

export const useInsertMatch = () => {
  return useMutation<void, Error, MatchInsert>({
    mutationFn: insertMatch,
  })
}
