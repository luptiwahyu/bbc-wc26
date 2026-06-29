import { useQuery } from '@tanstack/react-query'
import { getPlayers } from '../services/api'
import { Player } from '../models/player.types'

export const usePlayers = () => {
  return useQuery<Player[], Error>({
    queryKey: ['players'],
    queryFn: getPlayers,
  })
}
