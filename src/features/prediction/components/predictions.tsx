import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
import { FC } from 'react'
import { usePredictions } from '../hooks'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'

const Predictions: FC = () => {
  const { data: players, isPending, isSuccess } = usePredictions()

  return (
    <div className="space-y-2">
      {isPending && <Label>Loading...</Label>}

      {isSuccess &&
        players.map((player) => (
          <Collapsible key={player.player_id}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="group w-full justify-start transition-none"
              >
                <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                {player.player_name}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 ml-6">
              <div className="flex flex-col gap-2">
                {player.predictions.map((prediction) => (
                  <Collapsible key={prediction.prediction_id}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group w-full justify-start transition-none"
                      >
                        <ChevronRightIcon className="transition-transform group-data-[state=open]:rotate-90" />
                        {prediction.match.home_team?.name} vs{' '}
                        {prediction.match.away_team?.name}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-[25px]">
                      {new Date() < new Date(prediction.match.date!) && (
                        <Label className="my-2.5 font-normal">
                          Bisa dilihat saat pertandingan dimulai
                        </Label>
                      )}

                      {new Date() >= new Date(prediction.match.date!) && (
                        <Table className="my-1">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="h-6 pl-0">
                                Prediksi
                              </TableHead>
                              <TableHead className="h-6 pl-0">
                                Jawaban
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {!!prediction.predicted_winner_name && (
                              <TableRow>
                                <TableCell className="py-1 pl-0 max-w-1/2 whitespace-normal">
                                  Pemenang
                                </TableCell>
                                <TableCell className="py-1 pl-0">
                                  {prediction.predicted_winner_name}
                                </TableCell>
                              </TableRow>
                            )}

                            {prediction.predicted_total_goals !== null && (
                              <TableRow>
                                <TableCell className="py-1 pl-0 max-w-1/2 whitespace-normal">
                                  Jumlah Gol
                                </TableCell>
                                <TableCell className="py-1 pl-0">
                                  {prediction.predicted_total_goals}
                                </TableCell>
                              </TableRow>
                            )}

                            {!!prediction.predicted_score && (
                              <TableRow>
                                <TableCell className="py-1 pl-0 max-w-1/2 whitespace-normal">
                                  Skor
                                </TableCell>
                                <TableCell className="py-1 pl-0">
                                  {prediction.predicted_score}
                                </TableCell>
                              </TableRow>
                            )}

                            {!!prediction.predicted_first_team_to_score_name && (
                              <TableRow>
                                <TableCell className="py-1 pl-0 max-w-1/2 whitespace-normal">
                                  Gol Pertama (Negara)
                                </TableCell>
                                <TableCell className="py-1 pl-0">
                                  {
                                    prediction.predicted_first_team_to_score_name
                                  }
                                </TableCell>
                              </TableRow>
                            )}

                            {!!prediction.predicted_first_player_to_score && (
                              <TableRow>
                                <TableCell className="py-1 pl-0 max-w-1/2 whitespace-normal">
                                  Gol Pertama (Pemain)
                                </TableCell>
                                <TableCell className="py-1 pl-0">
                                  {prediction.predicted_first_player_to_score}
                                </TableCell>
                              </TableRow>
                            )}

                            {prediction.predicted_total_yellow_card_home !==
                              null && (
                              <TableRow>
                                <TableCell className="py-1 pl-0 max-w-1/2 whitespace-normal">
                                  Kartu Kuning {prediction.match.home_team.name}
                                </TableCell>
                                <TableCell className="py-1 pl-0">
                                  {prediction.predicted_total_yellow_card_home}
                                </TableCell>
                              </TableRow>
                            )}

                            {prediction.predicted_total_yellow_card_away !==
                              null && (
                              <TableRow>
                                <TableCell className="py-1 pl-0 max-w-1/2 whitespace-normal">
                                  Kartu Kuning {prediction.match.away_team.name}
                                </TableCell>
                                <TableCell className="py-1 pl-0">
                                  {prediction.predicted_total_yellow_card_away}
                                </TableCell>
                              </TableRow>
                            )}

                            {prediction.predicted_shots_on_target_home !==
                              null && (
                              <TableRow>
                                <TableCell className="py-1 pl-0 max-w-1/2 whitespace-normal">
                                  Shots on Target{' '}
                                  {prediction.match.home_team.name}
                                </TableCell>
                                <TableCell className="py-1 pl-0">
                                  {prediction.predicted_shots_on_target_home}
                                </TableCell>
                              </TableRow>
                            )}

                            {prediction.predicted_shots_on_target_away !==
                              null && (
                              <TableRow>
                                <TableCell className="py-1 pl-0 max-w-1/2 whitespace-normal">
                                  Shots on Target{' '}
                                  {prediction.match.away_team.name}
                                </TableCell>
                                <TableCell className="py-1 pl-0">
                                  {prediction.predicted_shots_on_target_away}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
    </div>
  )
}

export default Predictions
