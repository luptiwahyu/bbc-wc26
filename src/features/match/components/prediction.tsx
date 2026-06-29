import type { Match } from '@/features/match/models/match.types'
import { FieldLabel } from '@/shared/components/ui/field'
import { Item } from '@/shared/components/ui/item'
import { CrownIcon } from 'lucide-react'
import Image from 'next/image'
import { FC, useState } from 'react'

interface Props {
  data: Match[]
}

const Prediction: FC<Props> = ({ data }) => {
  const [matches, setMatches] = useState<Match[]>(data)

  const selectWinner = (id: string, countryCode: string): void => {
    setMatches((prev) =>
      prev.map((match) =>
        match.id === id
          ? {
              ...match,
              prediction: {
                ...match.prediction,
                predicted_winner: countryCode,
              },
            }
          : match
      )
    )
  }

  return (
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
              onClick={() => selectWinner(match.id, match.home_team.code!)}
            >
              <CrownIcon
                size={22}
                className={
                  match.prediction?.predicted_winner === match.home_team.code
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
              <FieldLabel className="text-wrap">
                {match.home_team.name}
              </FieldLabel>
            </div>
            <div className="flex items-center justify-center">VS</div>
            <div
              className="flex flex-col w-[50px] md:w-full items-center space-y-2 cursor-pointer"
              onClick={() => selectWinner(match.id, match.away_team.code!)}
            >
              <CrownIcon
                size={22}
                className={
                  match.prediction?.predicted_winner === match.away_team.code
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
              <FieldLabel className="text-wrap">
                {match.away_team.name}
              </FieldLabel>
            </div>
          </div>
        </Item>
      ))}
    </div>
  )
}

export default Prediction
