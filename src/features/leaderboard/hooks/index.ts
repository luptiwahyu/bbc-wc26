import { useQuery } from '@tanstack/react-query'
import { Leaderboard } from '../models/leaderboard.types'
import { getLeaderboard } from '../services/api'

export const useLeaderboard = () => {
  return useQuery<Leaderboard[], Error>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    staleTime: 0,
  })
}
