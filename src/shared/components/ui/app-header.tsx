import { FC, useEffect, useState } from 'react'
import { FieldDescription, FieldLegend } from './field'
import { appStorage } from '@/shared/lib/utils'
import { Player } from '@/features/player/models/player.types'

const AppHeader: FC = () => {
  const [player, setPlayer] = useState<Player | null>(null)

  useEffect(() => {
    const savedPlayer = appStorage.get<Player>('player')
    if (savedPlayer) setPlayer(savedPlayer)
  }, [])

  return (
    <>
      <FieldLegend>{player?.name || 'Loading...'}</FieldLegend>
      <FieldDescription className="bg-linear-to-r from-usa via-mexico to-canada bg-clip-text text-transparent w-fit bg-yellow-100">
        Bangbayang FWC 26
      </FieldDescription>
    </>
  )
}

export default AppHeader
