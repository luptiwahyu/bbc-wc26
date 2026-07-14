import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardFooter } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from '@/shared/components/ui/native-select'
import Image from 'next/image'
import { FC, useState } from 'react'
import { MatchForm, MatchStatus, MatchUpdate } from '../models/match.types'
import { capitalize, getTeamPlayers } from '@/shared/lib/utils'
import { MATCH_STATUSES } from '@/shared/constants'
import { useUpdateMatch } from '../hooks'
import { toast } from 'sonner'

interface Props {
  data: MatchForm[]
}

const MatchUpdateManagement: FC<Props> = ({ data }) => {
  const [matches, setMatches] = useState<MatchForm[]>(data)
  const updateMatch = useUpdateMatch()

  const updateStatus = (id: string, newStatus: MatchStatus) => {
    setMatches((prevMatch) =>
      prevMatch.map((match) =>
        match.id === id ? { ...match, form_status: newStatus } : match
      )
    )
  }

  const updateWinner = (id: string, winner: string) => {
    setMatches((prevMatch) =>
      prevMatch.map((match) =>
        match.id === id ? { ...match, form_result_winner: winner } : match
      )
    )
  }

  const updateTotalGoals = (id: string, goals: string) => {
    setMatches((prevMatch) =>
      prevMatch.map((match) =>
        match.id === id ? { ...match, form_result_total_goals: goals } : match
      )
    )
  }

  const updateFirstTeamToScore = (id: string, team: string) => {
    setMatches((prevMatch) =>
      prevMatch.map((match) =>
        match.id === id
          ? { ...match, form_result_first_team_to_score: team }
          : match
      )
    )
  }

  const updateFirstPlayerToScore = (id: string, player: string) => {
    setMatches((prevMatch) =>
      prevMatch.map((match) =>
        match.id === id
          ? { ...match, form_result_first_player_to_score: player }
          : match
      )
    )
  }

  const saveUpdate = (match: MatchForm): void => {
    const payload: MatchUpdate = {
      id: match.id,
      status: match.form_status,
      result_winner: match.form_result_winner,
      result_total_goals: Number(match.form_result_total_goals) || null,
      result_first_team_to_score: match.form_result_first_team_to_score,
    }

    const updatePromise = new Promise((resolve, reject) => {
      updateMatch.mutate(payload, {
        onSuccess: () => {
          setMatches((prevMatch) =>
            prevMatch.map((match) =>
              match.id === payload.id ? { ...match, ...payload } : match
            )
          )
          resolve('OK')
        },
        onError: reject,
      })
    })

    toast.promise(updatePromise, {
      loading: 'Memproses...',
      success: () => 'Berhasil mengubah data pertandingan',
      error: (error) => `Upps ada error. ${error.message}`,
    })
  }

  return (
    <>
      {matches.map((match) => (
        <Card key={match.id}>
          <CardContent>
            <div className="flex space-x-4 w-full mb-4">
              <div className="flex-1 flex flex-col items-center space-y-2 cursor-pointer">
                <div className="w-[30px]">
                  <Image
                    src={`https://api.fifa.com/api/v3/picture/flags-sq-4/${match.home_team.code}`}
                    width={200}
                    height={200}
                    alt="flag"
                    loading="eager"
                    className="rounded-tr-sm rounded-bl-sm w-full h-auto border"
                  />
                </div>
                <Label className="text-wrap truncate text-center">
                  {match.home_team.name}
                </Label>
              </div>
              <Label className="w-10 flex items-center justify-center mb-[22px]">
                vs
              </Label>
              <div className="flex-1 flex flex-col items-center space-y-2 cursor-pointer">
                <div className="w-[30px]">
                  <Image
                    src={`https://api.fifa.com/api/v3/picture/flags-sq-4/${match.away_team.code}`}
                    width={200}
                    height={200}
                    alt="flag"
                    loading="eager"
                    className="rounded-tr-sm rounded-bl-sm w-full h-auto border"
                  />
                </div>
                <Label className="text-wrap truncate text-center">
                  {match.away_team.name}
                </Label>
              </div>
            </div>

            <form className="space-y-2">
              <div className="grid grid-cols-2 gap-2 items-center">
                <div>Status</div>
                <NativeSelect
                  className="w-full"
                  disabled={match.status === 'finished'}
                  value={match.form_status}
                  onChange={(e) =>
                    updateStatus(match.id, e.target.value as MatchStatus)
                  }
                >
                  <NativeSelectOption value="">Pilih</NativeSelectOption>
                  {MATCH_STATUSES.map((status) => (
                    <NativeSelectOption key={status} value={status}>
                      {capitalize(status)}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <div>Pemenang</div>
                <NativeSelect
                  className="w-full"
                  disabled={match.status !== 'live'}
                  value={match.form_result_winner!}
                  onChange={(e) => updateWinner(match.id, e.target.value)}
                >
                  <NativeSelectOption value="">Pilih</NativeSelectOption>
                  <NativeSelectOption value={match.home_team.code}>
                    {match.home_team.name}
                  </NativeSelectOption>
                  <NativeSelectOption value={match.away_team.code}>
                    {match.away_team.name}
                  </NativeSelectOption>
                </NativeSelect>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <div>Jumlah Gol</div>
                <Input
                  type="text"
                  placeholder="0"
                  inputMode="numeric"
                  className="text-base placeholder:text-xs"
                  disabled={match.status !== 'live'}
                  value={match.form_result_total_goals!}
                  onChange={(e) => updateTotalGoals(match.id, e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 items-center">
                <div>Gol Pertama (Negara)</div>
                <NativeSelect
                  className="w-full"
                  disabled={match.status !== 'live'}
                  value={match.form_result_first_team_to_score!}
                  onChange={(e) =>
                    updateFirstTeamToScore(match.id, e.target.value)
                  }
                >
                  <NativeSelectOption value="">Pilih</NativeSelectOption>
                  <NativeSelectOption value={match.home_team.code}>
                    {match.home_team.name}
                  </NativeSelectOption>
                  <NativeSelectOption value={match.away_team.code}>
                    {match.away_team.name}
                  </NativeSelectOption>
                </NativeSelect>
              </div>

              <div className="grid grid-cols-2 gap-2 items-center">
                <div>Gol Pertama (Pemain)</div>
                <NativeSelect
                  className="w-full"
                  disabled={match.status !== 'live'}
                  value={match.form_result_first_player_to_score!}
                  onChange={(e) =>
                    updateFirstPlayerToScore(match.id, e.target.value)
                  }
                >
                  <NativeSelectOption value="">Pilih</NativeSelectOption>
                  <NativeSelectOption value="none" className="text-right">
                    Tidak ada
                  </NativeSelectOption>
                  <NativeSelectOptGroup label={match.home_team.name}>
                    {getTeamPlayers(match.home_team.code!).map((player) => (
                      <NativeSelectOption
                        key={player}
                        value={player}
                        className="text-right"
                      >
                        {player}
                      </NativeSelectOption>
                    ))}
                  </NativeSelectOptGroup>
                  <NativeSelectOptGroup label={match.away_team.name}>
                    {getTeamPlayers(match.away_team.code!).map((player) => (
                      <NativeSelectOption
                        key={player}
                        value={player}
                        className="text-right"
                      >
                        {player}
                      </NativeSelectOption>
                    ))}
                  </NativeSelectOptGroup>
                </NativeSelect>
              </div>
            </form>
          </CardContent>
          {match.status !== 'finished' && (
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={updateMatch.isPending}
                onClick={() => saveUpdate(match)}
              >
                Simpan
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </>
  )
}

export default MatchUpdateManagement
