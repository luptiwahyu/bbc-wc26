'use client'

import MatchManagement from '@/features/match/components/management'
import { useAllMatches } from '@/features/match/hooks'
import { MatchForm } from '@/features/match/models/match.types'
import { Player } from '@/features/player/models/player.types'
import AppContent from '@/shared/components/ui/app-content'
import { FieldLabel } from '@/shared/components/ui/field'
import { Label } from '@/shared/components/ui/label'
import { appStorage } from '@/shared/lib/utils'
import { notFound } from 'next/navigation'
import { useMemo } from 'react'

export default function MatchManagementPage() {
  const player = appStorage.get<Player>('player')
  const { data, isPending, isSuccess } = useAllMatches()

  const matches = useMemo<MatchForm[]>((): MatchForm[] => {
    return (
      data?.map((match) => {
        return {
          ...match,
          form_status: match.status,
          form_result_winner: match.result_winner ?? '',
          form_result_total_goals:
            match.result_total_goals === null
              ? ''
              : String(match.result_total_goals),
        }
      }) ?? []
    )
  }, [data])

  if (!player || player.name !== 'Wahyu') return notFound()

  return (
    <AppContent>
      <FieldLabel>Manajemen Pertandingan</FieldLabel>
      {isPending && <Label>Loading...</Label>}
      {isSuccess && <MatchManagement data={matches} />}
    </AppContent>
  )
}
