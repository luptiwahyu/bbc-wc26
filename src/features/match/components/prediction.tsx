import type {
  Match,
  PredictionUpsert,
} from '@/features/match/models/match.types'
import { FieldLabel } from '@/shared/components/ui/field'
import { Item } from '@/shared/components/ui/item'
import { CrownIcon } from 'lucide-react'
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
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from '@/shared/components/ui/native-select'
import { getTeamPlayers } from '@/shared/lib/utils'
import { Input } from '@/shared/components/ui/input'

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

  const updateSetMatch = (
    matchId: string,
    field: string,
    value: string
  ): void => {
    setMatches((prev) =>
      prev.map((match) =>
        match.id === matchId
          ? {
              ...match,
              prediction: {
                ...match.prediction,
                [field]: value,
              },
            }
          : match
      )
    )
  }

  const handleChangePredictionText = (
    matchId: string,
    field: string,
    value: string
  ): void => {
    updateSetMatch(matchId, field, value)

    setTimeout(() => {
      const payload: PredictionUpsert = {
        match_id: matchId,
        player_id: player.id,
        [field]: value,
      }

      savePrediction.mutate(payload, {
        onError: () => {
          toast.error('Upps ada error!')
        },
      })
    }, 500)
  }

  const handleChangeScore = (
    matchId: string,
    field: string,
    value: string
  ): void => {
    if (value === '' || /^\d+$/.test(value)) {
      updateSetMatch(matchId, field, value)
    }
  }

  const saveScore = async (matchId: string) => {
    const match = matches.find((m) => m.id === matchId)
    const scoreHome = match?.prediction.predicted_score_home
    const scoreAway = match?.prediction.predicted_score_away

    if (match && scoreHome && scoreAway) {
      const payload: PredictionUpsert = {
        match_id: matchId,
        player_id: player.id,
        predicted_score: `${scoreHome}-${scoreAway}`,
      }

      savePrediction.mutate(payload, {
        onError: () => {
          toast.error('Upps ada error!')
        },
      })
    }
  }

  const updateSetMatchNumber = (
    matchId: string,
    field: string,
    value: string
  ): void => {
    if (value === '' || /^\d+$/.test(value)) {
      setMatches((prev) =>
        prev.map((match) =>
          match.id === matchId
            ? {
                ...match,
                prediction: {
                  ...match.prediction,
                  [field]: Number(value),
                },
              }
            : match
        )
      )
    }
  }

  const handleChangePredictionNumber = (
    matchId: string,
    field: string,
    value: string
  ): void => {
    const payload: PredictionUpsert = {
      match_id: matchId,
      player_id: player.id,
      [field]: value,
    }

    savePrediction.mutate(payload, {
      onError: () => {
        toast.error('Upps ada error!')
      },
    })
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

            <div className="flex space-x-2 mt-1.5">
              <div className="w-8 flex items-center justify-center">
                <Input
                  placeholder="-"
                  className="text-center text-base text-muted-foreground font-bold"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={match.prediction.predicted_score_home}
                  onChange={(e) =>
                    handleChangeScore(
                      match.id,
                      'predicted_score_home',
                      e.target.value
                    )
                  }
                  onBlur={() => saveScore(match.id)}
                />
              </div>
              <div className="w-8 flex items-center justify-center">
                <Input
                  placeholder="-"
                  className="text-center text-base text-muted-foreground font-bold"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={match.prediction.predicted_score_away}
                  onChange={(e) =>
                    handleChangeScore(
                      match.id,
                      'predicted_score_away',
                      e.target.value
                    )
                  }
                  onBlur={() => saveScore(match.id)}
                />
              </div>
            </div>

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
            {false && (
              <InputGroup className="rounded-none border-l-0 border-r-0 border-b-0">
                <InputGroupAddon
                  className="pl-6 pr-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  Jumlah Gol
                </InputGroupAddon>
                <InputGroupInput
                  type="text"
                  placeholder="Isi"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="pr-6 text-base text-right placeholder:text-xs text-muted-foreground"
                  value={match.prediction.predicted_total_goals ?? ''}
                  onChange={(e) =>
                    updateSetMatchNumber(
                      match.id,
                      'predicted_total_goals',
                      e.target.value
                    )
                  }
                  onBlur={(e) =>
                    handleChangePredictionNumber(
                      match.id,
                      'predicted_total_goals',
                      e.target.value
                    )
                  }
                />
              </InputGroup>
            )}

            <InputGroup className="rounded-none border-l-0 border-r-0 border-b-0 flex">
              <InputGroupAddon
                className="pl-6 pr-4 flex-none"
                onClick={(e) => e.stopPropagation()}
              >
                Gol Pertama (Negara)
              </InputGroupAddon>
              <NativeSelect
                id="scorer"
                style={{ textAlign: 'right', direction: 'rtl' }}
                className="grow mr-4 border-0 focus-visible:border-none focus-visible:ring-0 bg-transparent text-muted-foreground"
                value={match.prediction.predicted_first_team_to_score!}
                onChange={(e) =>
                  handleChangePredictionText(
                    match.id,
                    'predicted_first_team_to_score',
                    e.target.value
                  )
                }
              >
                <NativeSelectOption value="">Pilih</NativeSelectOption>
                <NativeSelectOption value="NONE">Tidak ada</NativeSelectOption>
                <NativeSelectOption value={match.home_team.code}>
                  {match.home_team.name}
                </NativeSelectOption>
                <NativeSelectOption value={match.away_team.code}>
                  {match.away_team.name}
                </NativeSelectOption>
              </NativeSelect>
            </InputGroup>

            <InputGroup className="rounded-none border-l-0 border-r-0 border-b-0 flex">
              <InputGroupAddon
                className="pl-6 pr-4 flex-none"
                onClick={(e) => e.stopPropagation()}
              >
                Gol Pertama (Pemain)
              </InputGroupAddon>
              <NativeSelect
                id="scorer"
                style={{ textAlign: 'right', direction: 'rtl' }}
                className="grow mr-4 border-0 focus-visible:border-none focus-visible:ring-0 bg-transparent text-muted-foreground"
                value={match.prediction.predicted_first_player_to_score!}
                onChange={(e) =>
                  handleChangePredictionText(
                    match.id,
                    'predicted_first_player_to_score',
                    e.target.value
                  )
                }
              >
                <NativeSelectOption value="">Pilih</NativeSelectOption>
                <NativeSelectOption value="NONE">Tidak ada</NativeSelectOption>
                <NativeSelectOptGroup label={match.home_team.name}>
                  {getTeamPlayers(match.home_team.code!).map((player) => (
                    <NativeSelectOption key={player} value={player}>
                      {player}
                    </NativeSelectOption>
                  ))}
                </NativeSelectOptGroup>
                <NativeSelectOptGroup label={match.away_team.name}>
                  {getTeamPlayers(match.away_team.code!).map((player) => (
                    <NativeSelectOption key={player} value={player}>
                      {player}
                    </NativeSelectOption>
                  ))}
                </NativeSelectOptGroup>
              </NativeSelect>
            </InputGroup>

            {false && (
              <InputGroup className="rounded-none border-l-0 border-r-0 border-b-0 flex">
                <InputGroupAddon
                  className="pl-6 pr-4 flex-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  VAR Bantu {match.away_team.name}
                </InputGroupAddon>
                <NativeSelect
                  id="scorer"
                  style={{ textAlign: 'right', direction: 'rtl' }}
                  className="grow mr-4 border-0 focus-visible:border-none focus-visible:ring-0 bg-transparent text-muted-foreground"
                >
                  <NativeSelectOption value="">Pilih</NativeSelectOption>
                  <NativeSelectOption value="NO">Gaklah</NativeSelectOption>
                  <NativeSelectOption value="YES">Jelas</NativeSelectOption>
                </NativeSelect>
              </InputGroup>
            )}

            <InputGroup className="rounded-none border-l-0 border-r-0 border-b-0 flex">
              <InputGroupAddon
                className="pl-6 pr-4 flex-none"
                onClick={(e) => e.stopPropagation()}
              >
                First Throw-in
              </InputGroupAddon>
              <NativeSelect
                id="scorer"
                style={{ textAlign: 'right', direction: 'rtl' }}
                className="grow mr-4 border-0 focus-visible:border-none focus-visible:ring-0 bg-transparent text-muted-foreground"
              >
                <NativeSelectOption value="">Pilih</NativeSelectOption>
                <NativeSelectOption value={match.home_team.name}>
                  {match.home_team.name}
                </NativeSelectOption>
                <NativeSelectOption value={match.away_team.name}>
                  {match.away_team.name}
                </NativeSelectOption>
              </NativeSelect>
            </InputGroup>

            <InputGroup className="rounded-none border-l-0 border-r-0 border-b-0">
              <InputGroupAddon
                className="pl-6 pr-4"
                onClick={(e) => e.stopPropagation()}
              >
                Kartu Kuning {match.home_team.name}
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder="Isi"
                inputMode="numeric"
                pattern="[0-9]*"
                className="pr-6 text-base text-right placeholder:text-xs text-muted-foreground"
                value={match.prediction.predicted_total_yellow_card_home ?? ''}
                onChange={(e) =>
                  updateSetMatchNumber(
                    match.id,
                    'predicted_total_yellow_card_home',
                    e.target.value
                  )
                }
                onBlur={(e) =>
                  handleChangePredictionNumber(
                    match.id,
                    'predicted_total_yellow_card_home',
                    e.target.value
                  )
                }
              />
            </InputGroup>

            <InputGroup className="rounded-none border-l-0 border-r-0 border-b-0">
              <InputGroupAddon
                className="pl-6 pr-4"
                onClick={(e) => e.stopPropagation()}
              >
                Kartu Kuning {match.away_team.name}
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder="Isi"
                inputMode="numeric"
                pattern="[0-9]*"
                className="pr-6 text-base text-right placeholder:text-xs text-muted-foreground"
                value={match.prediction.predicted_total_yellow_card_away ?? ''}
                onChange={(e) =>
                  updateSetMatchNumber(
                    match.id,
                    'predicted_total_yellow_card_away',
                    e.target.value
                  )
                }
                onBlur={(e) =>
                  handleChangePredictionNumber(
                    match.id,
                    'predicted_total_yellow_card_away',
                    e.target.value
                  )
                }
              />
            </InputGroup>

            <InputGroup className="rounded-none border-l-0 border-r-0 border-b-0">
              <InputGroupAddon
                className="pl-6 pr-4"
                onClick={(e) => e.stopPropagation()}
              >
                Shots on Target {match.home_team.name}
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder="Isi"
                inputMode="numeric"
                pattern="[0-9]*"
                className="pr-6 text-base text-right placeholder:text-xs text-muted-foreground"
                value={match.prediction.predicted_shots_on_target_home ?? ''}
                onChange={(e) =>
                  updateSetMatchNumber(
                    match.id,
                    'predicted_shots_on_target_home',
                    e.target.value
                  )
                }
                onBlur={(e) =>
                  handleChangePredictionNumber(
                    match.id,
                    'predicted_shots_on_target_home',
                    e.target.value
                  )
                }
              />
            </InputGroup>

            <InputGroup className="rounded-none border-l-0 border-r-0 border-b-0">
              <InputGroupAddon
                className="pl-6 pr-4"
                onClick={(e) => e.stopPropagation()}
              >
                Shots on Target {match.away_team.name}
              </InputGroupAddon>
              <InputGroupInput
                type="text"
                placeholder="Isi"
                inputMode="numeric"
                pattern="[0-9]*"
                className="pr-6 text-base text-right placeholder:text-xs text-muted-foreground"
                value={match.prediction.predicted_shots_on_target_away ?? ''}
                onChange={(e) =>
                  updateSetMatchNumber(
                    match.id,
                    'predicted_shots_on_target_away',
                    e.target.value
                  )
                }
                onBlur={(e) =>
                  handleChangePredictionNumber(
                    match.id,
                    'predicted_shots_on_target_away',
                    e.target.value
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
