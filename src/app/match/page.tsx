'use client'

import Prediction from '@/features/match/components/prediction'
import { useMatches } from '@/features/match/hooks'
import { Player } from '@/features/player/models/player.types'
import AppContent from '@/shared/components/ui/app-content'
import { FieldLabel } from '@/shared/components/ui/field'
import { Label } from '@/shared/components/ui/label'
import { Separator } from '@/shared/components/ui/separator'
import { appStorage } from '@/shared/lib/utils'
import { LogOutIcon, TrophyIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
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
          <Logout />
        </Suspense>
      </FieldLabel>

      {isPending && <Label>Loading...</Label>}
      {isSuccess && <Prediction data={matches} player={player!} />}
    </AppContent>
  )
}

function Logout() {
  const router = useRouter()
  const params = useSearchParams()
  const logoutVisible: boolean = params.get('logout') === 'true'

  const logout = (): void => {
    appStorage.clearByPrefix()
    setTimeout(() => {
      router.push('/')
    }, 300)
  }

  if (logoutVisible) {
    return (
      <>
        <Separator orientation="vertical" />
        <div className="cursor-pointer hover:underline" onClick={logout}>
          <div className="flex space-x-1">
            <span>Logout</span>
            <LogOutIcon size={14} />
          </div>
        </div>
      </>
    )
  }
}
