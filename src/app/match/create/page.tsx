'use client'

import MatchCreateManagement from '@/features/match/components/create'
import { MatchCreateForm } from '@/features/match/models/match.types'
import AppContent from '@/shared/components/ui/app-content'
import { FieldLabel } from '@/shared/components/ui/field'
import { Separator } from '@/shared/components/ui/separator'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function MatchCreatePage() {
  const todayString = new Date().toISOString().split('T')[0]
  const [form] = useState<MatchCreateForm>({
    home_team_id: '',
    away_team_id: '',
    date: todayString,
    time: '00:00:00',
    status: 'upcoming',
  })

  return (
    <AppContent>
      <FieldLabel>
        <Link href="/match/manage" className="hover:underline">
          <div className="flex space-x-1">
            <ArrowLeftIcon size={14} />
          </div>
        </Link>
        <Separator orientation="vertical" />
        <FieldLabel>Tambah Pertandingan</FieldLabel>
      </FieldLabel>

      <MatchCreateManagement data={form} />
    </AppContent>
  )
}
