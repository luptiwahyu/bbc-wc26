import { MatchStatus } from '@/features/match/models/match.types'

export const STALE_TIME: number = 1000 * 60 * 5 // 5 minutes

export const TYPING_DELAY: number = 700

export const MATCH_STATUSES: MatchStatus[] = ['upcoming', 'live', 'finished']
