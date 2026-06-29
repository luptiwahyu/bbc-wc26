'use client'

import { useLeaderboard } from '@/features/leaderboard/hooks'
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

export default function Leaderboard() {
  const { data: leaderboards, isPending, isSuccess } = useLeaderboard()

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
              <TableHead className="font-normal">Pemain</TableHead>
              <TableHead className="font-normal text-center">Main</TableHead>
              <TableHead className="font-normal text-center">Menang</TableHead>
              <TableHead className="font-normal text-center">Kalah</TableHead>
              <TableHead className="font-bold text-center">Poin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {isSuccess &&
              leaderboards.map((player, playerIdx) => (
                <TableRow
                  key={player.player_id}
                  className={playerIdx % 2 === 1 ? 'bg-muted/50' : ''}
                >
                  <TableCell>{player.player_name}</TableCell>
                  <TableCell className="text-center">{player.played}</TableCell>
                  <TableCell className="text-center">{player.win}</TableCell>
                  <TableCell className="text-center">{player.lose}</TableCell>
                  <TableCell className="text-center font-bold">
                    {player.points}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </AppContent>
  )
}
