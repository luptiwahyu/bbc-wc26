import { useQuery } from '@tanstack/react-query'
import { Match } from '../models/match.types'
import { getMatches } from '../services/api'

export const useMatches = (playerId: string) => {
  return useQuery<Match[], Error>({
    queryKey: ['matches'],
    queryFn: () => getMatches(playerId),
  })
}
