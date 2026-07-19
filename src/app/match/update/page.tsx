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
          form_result_score: match.result_score ?? '',
          form_result_first_team_to_score:
            match.result_first_team_to_score ?? '',
          form_result_first_player_to_score:
            match.result_first_player_to_score ?? '',
          form_result_first_throw_in: match.result_first_throw_in ?? '',
          form_result_total_yellow_card_home:
            match.result_total_yellow_card_home === null
              ? ''
              : String(match.result_total_yellow_card_home),
          form_result_total_yellow_card_away:
            match.result_total_yellow_card_away === null
              ? ''
              : String(match.result_total_yellow_card_away),
          form_result_shots_on_target_home:
            match.result_shots_on_target_home === null
              ? ''
              : String(match.result_shots_on_target_home),
          form_result_shots_on_target_away:
            match.result_shots_on_target_away === null
              ? ''
              : String(match.result_shots_on_target_away),
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
