'use client'

import AppContent from '@/shared/components/ui/app-content'
import { FieldLabel } from '@/shared/components/ui/field'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import { SwordsIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Leaderboard {
  name: string
  play: number
  win: number
  lose: number
  point: number
}

const data: Leaderboard[] = [
  {
    name: 'Askur',
    play: 3,
    win: 2,
    lose: 1,
    point: 6,
  },
  {
    name: 'Caki',
    play: 3,
    win: 1,
    lose: 2,
    point: 3,
  },
  {
    name: 'Dimas',
    play: 3,
    win: 0,
    lose: 3,
    point: 0,
  },
]

export default function Leaderboard() {
  const [leaderboards] = useState<Leaderboard[]>(data)

  return (
    <AppContent>
      <FieldLabel asChild>
        <Link href="/match" className="hover:underline">
          <div className="flex space-x-1">
            <span>Lihat Pertandingan</span>
            <SwordsIcon size={14} />
          </div>
        </Link>
      </FieldLabel>

      <div className="overflow-hidden rounded-sm border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Pemain</TableHead>
              <TableHead className="text-center">Main</TableHead>
              <TableHead className="text-center">Menang</TableHead>
              <TableHead className="text-center">Kalah</TableHead>
              <TableHead className="text-center font-bold">Poin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboards.map((player, playerIdx) => (
              <TableRow
                key={playerIdx}
                className={playerIdx % 2 === 1 ? 'bg-muted/50' : ''}
              >
                <TableCell>{player.name}</TableCell>
                <TableCell className="text-center">{player.play}</TableCell>
                <TableCell className="text-center">{player.win}</TableCell>
                <TableCell className="text-center">{player.lose}</TableCell>
                <TableCell className="text-center font-bold">
                  {player.point}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppContent>
  )
}
