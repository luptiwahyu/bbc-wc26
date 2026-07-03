'use client'

import { Player } from '@/features/player/models/player.types'
import AppContent from '@/shared/components/ui/app-content'
import { FieldLabel } from '@/shared/components/ui/field'
import { Separator } from '@/shared/components/ui/separator'
import { appStorage } from '@/shared/lib/utils'
import { PencilSparklesIcon, PlusIcon, SwordsIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function MatchManagePage() {
  const player = appStorage.get<Player>('player')

  if (!player || player.name !== 'Wahyu') return notFound()

  return (
    <AppContent>
      <FieldLabel>
        <Link href="/match" className="hover:underline">
          <div className="flex space-x-1">
            <span>Pertandingan</span>
            <SwordsIcon size={14} />
          </div>
        </Link>
        <Separator orientation="vertical" />
        <Link href="/match/create" className="hover:underline">
          <div className="flex space-x-1">
            <span>Tambah</span>
            <PlusIcon size={14} />
          </div>
        </Link>
        <Separator orientation="vertical" />
        <Link href="/match/update" className="hover:underline">
          <div className="flex space-x-1">
            <span>Ubah</span>
            <PencilSparklesIcon size={14} />
          </div>
        </Link>
      </FieldLabel>
    </AppContent>
  )
}
