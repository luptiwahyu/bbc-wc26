import { MatchStatus } from '@/features/match/models/match.types'

export const STALE_TIME: number = 1000 * 60 * 5 // 5 minutes

export const TYPING_DELAY: number = 700

export const MATCH_STATUSES: MatchStatus[] = ['upcoming', 'live', 'finished']

export const FRANCE_PLAYERS: string[] = [
  'Mbappé',
  'Mateta',
  'Thuram',
  'Dembélé',
  'Barcola',
  'Doué',
  'Olise',
  'Cherki',
  'Tchouaméni',
  'Akliouche',
  'Koné',
  'Zaïre-Emery',
  'Rabiot',
  'Kanté',
  'Koundé',
  'Saliba',
  'Gusto',
  'Digne',
  'Lucas Hernández',
  'Konaté',
  'Upamecano',
  'Lacroix',
  'Théo Hernández',
  'Risser',
  'Samba',
  'Maignan',
]
