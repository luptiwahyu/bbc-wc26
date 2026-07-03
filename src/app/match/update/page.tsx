'use client'

import MatchUpdateManagement from '@/features/match/components/update'
import { useAllMatches } from '@/features/match/hooks'
import { MatchForm } from '@/features/match/models/match.types'
import AppContent from '@/shared/components/ui/app-content'
import { FieldLabel } from '@/shared/components/ui/field'
import { Label } from '@/shared/components/ui/label'
import { Separator } from '@/shared/components/ui/separator'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'

export default function MatchUpdatePage() {
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

  return (
    <AppContent>
      <FieldLabel>
        <Link href="/match/manage" className="hover:underline">
          <div className="flex space-x-1">
            <ArrowLeftIcon size={14} />
          </div>
        </Link>
        <Separator orientation="vertical" />
        <FieldLabel>Update Pertandingan</FieldLabel>
      </FieldLabel>
      {isPending && <Label>Loading...</Label>}
      {isSuccess && <MatchUpdateManagement data={matches} />}
    </AppContent>
  )
}
