'use client'

import MatchCreateManagement from '@/features/match/components/create'
import AppContent from '@/shared/components/ui/app-content'
import { FieldLabel } from '@/shared/components/ui/field'
import { Separator } from '@/shared/components/ui/separator'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function MatchCreatePage() {
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

      <MatchCreateManagement />
    </AppContent>
  )
}
