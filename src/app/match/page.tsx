'use client'

import Prediction from '@/features/match/components/prediction'
import { useMatches } from '@/features/match/hooks'
import { Player } from '@/features/player/models/player.types'
import AppContent from '@/shared/components/ui/app-content'
import AppLogout from '@/shared/components/ui/app-logout'
import { FieldLabel } from '@/shared/components/ui/field'
import { Label } from '@/shared/components/ui/label'
import { appStorage } from '@/shared/lib/utils'
import { TrophyIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export default function MatchPage() {
  const player = appStorage.get<Player>('player')
  const {
    data: matches,
    isPending,
    isSuccess,
  } = useMatches(player?.id as string)

  return (
    <AppContent>
      <FieldLabel>
        <Link href="/leaderboard" className="hover:underline">
          <div className="flex space-x-1">
            <span>Lihat Klasemen</span>
            <TrophyIcon size={14} />
          </div>
        </Link>
        <Suspense fallback={<Label>Loading...</Label>}>
          <AppLogout />
        </Suspense>
      </FieldLabel>

      {isPending && <Label>Loading...</Label>}
      {isSuccess && <Prediction data={matches} player={player!} />}
    </AppContent>
  )
}
