'use client'

import AppContent from '@/shared/components/ui/app-content'
import { FieldLabel } from '@/shared/components/ui/field'
import { Item } from '@/shared/components/ui/item'
import { ArrowUpRightIcon, CrownIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type status = 'upcoming' | 'live' | 'finished'

interface Country {
  id: string
  name: string
  code: string
}

interface Match {
  id: string
  home_team: Country
  away_team: Country
  status: status
  result_winner: string | null
}

const dataMatches: Match[] = [
  {
    id: '1',
    home_team: {
      id: '1',
      name: 'Jerman',
      code: 'GER',
    },
    away_team: {
      id: '2',
      name: 'Inggris',
      code: 'ENG',
    },
    status: 'live',
    result_winner: null,
  },
  {
    id: '2',
    home_team: {
      id: '1',
      name: 'Belanda',
      code: 'NED',
    },
    away_team: {
      id: '2',
      name: 'Jepang',
      code: 'JPN',
    },
    status: 'live',
    result_winner: null,
  },
  {
    id: '3',
    home_team: {
      id: '1',
      name: 'Brasil',
      code: 'BRA',
    },
    away_team: {
      id: '2',
      name: 'Mesir',
      code: 'EGY',
    },
    status: 'live',
    result_winner: null,
  },
  {
    id: '4',
    home_team: {
      id: '1',
      name: 'Kanada',
      code: 'CAN',
    },
    away_team: {
      id: '2',
      name: 'Kolombia',
      code: 'COL',
    },
    status: 'live',
    result_winner: null,
  },
]

export default function Match() {
  const [winner, setWinner] = useState<string>('')
  const [matches] = useState<Match[]>(dataMatches)

  const selectWinner = (countryCode: string): void => {
    setWinner(countryCode)
  }

  return (
    <AppContent>
      <FieldLabel>
        <Link href="/leaderboard" className="hover:underline">
          <div className="flex space-x-1">
            <span>Lihat Klasemen</span>
            <ArrowUpRightIcon size={14} />
          </div>
        </Link>
      </FieldLabel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {matches.map((match) => (
          <Item
            key={match.id}
            variant="outline"
            className="w-fit rounded-tr-4xl rounded-bl-4xl px-6"
          >
            <div className="flex space-x-4">
              <div
                className="flex flex-col w-[50px] md:w-full items-center space-y-2 cursor-pointer"
                onClick={() => selectWinner(match.home_team.code)}
              >
                <CrownIcon
                  size={18}
                  className={
                    winner === match.home_team.code
                      ? 'fill-yellow-400 stroke-1 stroke-yellow-600'
                      : 'fill-gray-300 stroke-1 stroke-gray-300'
                  }
                />
                <Image
                  src={`https://api.fifa.com/api/v3/picture/flags-sq-4/${match.home_team.code}`}
                  width={200}
                  height={200}
                  alt="flag"
                  loading="eager"
                  className="rounded-tr-2xl rounded-bl-2xl w-full h-auto border"
                />
                <FieldLabel>{match.home_team.name}</FieldLabel>
              </div>
              <div className="flex items-center justify-center">VS</div>
              <div
                className="flex flex-col w-[50px] md:w-full items-center space-y-2 cursor-pointer"
                onClick={() => selectWinner(match.away_team.code)}
              >
                <CrownIcon
                  size={18}
                  className={
                    winner === match.away_team.code
                      ? 'fill-yellow-400 stroke-1 stroke-yellow-600'
                      : 'fill-gray-300 stroke-1 stroke-gray-300'
                  }
                />
                <Image
                  src={`https://api.fifa.com/api/v3/picture/flags-sq-4/${match.away_team.code}`}
                  width={200}
                  height={200}
                  alt="flag"
                  loading="eager"
                  className="rounded-tr-2xl rounded-bl-2xl w-full h-auto border"
                />
                <FieldLabel>{match.away_team.name}</FieldLabel>
              </div>
            </div>
          </Item>
        ))}
      </div>
    </AppContent>
  )
}
