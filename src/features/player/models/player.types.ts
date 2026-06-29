import { Database } from '@/shared/models/database.types'

type PlayerTable = Database['public']['Tables']['wc_players']

export type Player = PlayerTable['Row']
