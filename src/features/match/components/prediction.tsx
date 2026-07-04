import type {
  Match,
  PredictionUpsert,
} from '@/features/match/models/match.types'
import { FieldLabel } from '@/shared/components/ui/field'
import { Item } from '@/shared/components/ui/item'
import { CircleQuestionMarkIcon, CrownIcon } from 'lucide-react'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useUpsertPrediction } from '../hooks'
import { Player } from '@/features/player/models/player.types'
import { toast } from 'sonner'
import { Label } from '@/shared/components/ui/label'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/components/ui/input-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'

interface Props {
  data: Match[]
  player: Player
}

interface SelectWinnerProps {
  matchId: string
  predictionId: string | undefined
  newPredictedWinner: string | undefined
  oldPredictedWinner: string | undefined
}

const Prediction: FC<Props> = ({ data, player }) => {
  const [matches, setMatches] = useState<Match[]>(data)
  const savePrediction = useUpsertPrediction()

  const selectWinner = (data: SelectWinnerProps): void => {
    if (data.newPredictedWinner !== data.oldPredictedWinner) {
      setMatches((prev) =>
        prev.map((match) =>
          match.id === data.matchId
            ? {
                ...match,
                prediction: {
                  ...match.prediction,
                  predicted_winner: data.newPredictedWinner,
                },
              }
            : match
        )
      )

      const payload: PredictionUpsert = {
        match_id: data.matchId,
        player_id: player.id,
        predicted_winner: data.newPredictedWinner,
      }

      savePrediction.mutate(payload, {
        onError: () => {
          toast.error('Upps ada error!')
        },
      })
    }
  }

  const saveTotalGoal = async (matchId: string, value: number) => {
    const payload: PredictionUpsert = {
      match_id: matchId,
      player_id: player.id,
      predicted_total_goals: value,
    }

    savePrediction.mutate(payload, {
      onError: () => {
        toast.error('Upps ada error!')
      },
    })
  }

  const handleChangeToalGoal = (
    id: string,
    field: string,
    value: string
  ): void => {
    if (value === '' || /^\d+$/.test(value)) {
      setMatches((prev) =>
        prev.map((match) =>
          match.id === id
            ? {
                ...match,
                prediction: {
                  ...match.prediction,
                  predicted_total_goals: Number(value),
                },
              }
            : match
        )
      )
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {!matches.length && (
        <Label className="text-muted-foreground">Belum ada pertandingan</Label>
      )}

      {matches.map((match) => (
        <Item
          key={match.id}
          variant="outline"
          className="rounded-tr-4xl rounded-bl-4xl p-0 bg-white overflow-hidden"
        >
          <div className="flex space-x-4 w-full py-2.5 px-8">
            <div
              className="flex-1 flex flex-col items-center space-y-2 cursor-pointer"
              onClick={() =>
                selectWinner({
                  matchId: match.id,
                  predictionId: match.prediction?.id,
                  newPredictedWinner: match.home_team.code!,
                  oldPredictedWinner: match.prediction?.predicted_winner,
                })
              }
            >
              <CrownIcon
                size={22}
                className={
                  match.prediction?.predicted_winner === match.home_team.code
                    ? 'fill-yellow-400 stroke-1 stroke-yellow-600 animate-tada-bounce'
                    : 'fill-gray-300 stroke-1 stroke-gray-300'
                }
              />
              <div className="w-[50px]">
                <Image
                  src={`https://api.fifa.com/api/v3/picture/flags-sq-4/${match.home_team.code}`}
                  width={200}
                  height={200}
                  alt="flag"
                  loading="eager"
                  className="rounded-tr-xl rounded-bl-xl w-full h-auto border"
                />
              </div>
              <FieldLabel className="text-wrap truncate text-center">
                {match.home_team.name}
              </FieldLabel>
            </div>
            <div className="w-10 flex items-center justify-center">VS</div>
            <div
              className="flex-1 flex flex-col items-center space-y-2 cursor-pointer"
              onClick={() =>
                selectWinner({
                  matchId: match.id,
                  predictionId: match.prediction?.id,
                  newPredictedWinner: match.away_team.code!,
                  oldPredictedWinner: match.prediction?.predicted_winner,
                })
              }
            >
              <CrownIcon
                size={22}
                className={
                  match.prediction?.predicted_winner === match.away_team.code
                    ? 'fill-yellow-400 stroke-1 stroke-yellow-600 animate-tada-bounce'
                    : 'fill-gray-300 stroke-1 stroke-gray-300'
                }
              />
              <div className="w-[50px]">
                <Image
                  src={`https://api.fifa.com/api/v3/picture/flags-sq-4/${match.away_team.code}`}
                  width={200}
                  height={200}
                  alt="flag"
                  loading="eager"
                  className="rounded-tr-xl rounded-bl-xl w-full h-auto border"
                />
              </div>
              <FieldLabel className="text-wrap truncate text-center">
                {match.away_team.name}
              </FieldLabel>
            </div>
          </div>

          <div className="space-y-0 mt-auto w-full">
            <InputGroup className="rounded-none border-l-0 border-r-0 border-b-0">
              <InputGroupAddon className="pl-10 pr-2">
                Jumlah Gol
                <Popover>
                  <PopoverTrigger asChild>
                    <CircleQuestionMarkIcon className="ml-1 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-fit">
                    Bukan Skor
                  </PopoverContent>
                </Popover>
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder="Isi"
                inputMode="numeric"
                pattern="[0-9]*"
                className="pr-10 text-base text-right placeholder:text-xs text-muted-foreground"
                value={match.prediction.predicted_total_goals ?? ''}
                onChange={(e) =>
                  handleChangeToalGoal(
                    match.id,
                    'predicted_total_goals',
                    e.target.value
                  )
                }
                onBlur={() =>
                  saveTotalGoal(
                    match.id,
                    match.prediction.predicted_total_goals!
                  )
                }
              />
            </InputGroup>
          </div>
        </Item>
      ))}
    </div>
  )
}

export default Prediction
