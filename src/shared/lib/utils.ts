import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import SecureStorage from './secure-storage'
import { QueryClient } from '@tanstack/react-query'
import {
  ARGENTINA_PLAYERS,
  ENGLAND_PLAYERS,
  FRANCE_PLAYERS,
  SPAIN_PLAYERS,
  STALE_TIME,
} from '../constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const appStorage = new SecureStorage({ prefix: 'bbc.' })

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
    },
  },
})

export const capitalize = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const isDataChanged = (
  initialData: object,
  newData: object
): boolean => {
  const initialDataString: string = JSON.stringify(initialData)
  const newDataString: string = JSON.stringify(newData)
  return initialDataString !== newDataString
}

export const getTeamPlayers = (countryCode: string): string[] => {
  switch (countryCode) {
    case 'FRA':
      return FRANCE_PLAYERS
    case 'ESP':
      return SPAIN_PLAYERS
    case 'ENG':
      return ENGLAND_PLAYERS
    case 'ARG':
      return ARGENTINA_PLAYERS
    default:
      return []
  }
}
