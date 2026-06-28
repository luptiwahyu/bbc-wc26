'use client'

import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/shared/components/ui/field'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
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
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Halo, Wahyu!</FieldLegend>
        <FieldDescription>Bangbayang World Cup 26</FieldDescription>
        <FieldGroup>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
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
                  <TableRow key={playerIdx}>
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
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
