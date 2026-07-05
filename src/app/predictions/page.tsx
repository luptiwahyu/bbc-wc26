'use client'

import PredictionsByPlayer from '@/features/prediction/components/predictions'
import AppContent from '@/shared/components/ui/app-content'
import AppLogout from '@/shared/components/ui/app-logout'
import { FieldLabel } from '@/shared/components/ui/field'
import { Label } from '@/shared/components/ui/label'
import { SwordsIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export default function PredictionsPage() {
  return (
    <AppContent>
      <FieldLabel>
        <Link href="/match" className="hover:underline">
          <div className="flex space-x-1">
            <span>Lihat Pertandingan</span>
            <SwordsIcon size={14} />
          </div>
        </Link>
        <Suspense fallback={<Label>Loading...</Label>}>
          <AppLogout />
        </Suspense>
      </FieldLabel>

      <PredictionsByPlayer />
    </AppContent>
  )
}
