'use client'

import { Player } from '@/features/player/models/player.types'
import { appStorage } from '@/shared/lib/utils'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const player = appStorage.get<Player>('player')
    if (!player) redirect('/player')
    else redirect('/match')
  }, [])
}
