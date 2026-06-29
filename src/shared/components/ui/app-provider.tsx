'use client'

import { queryClient } from '@/shared/lib/utils'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
