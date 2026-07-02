import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import SecureStorage from './secure-storage'
import { QueryClient } from '@tanstack/react-query'
import { STALE_TIME } from '../constants'

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
