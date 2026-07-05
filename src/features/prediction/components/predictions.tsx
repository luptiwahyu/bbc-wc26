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
                    <CollapsibleContent>
                      <div className="space-y-2 py-2 pl-6">
                        {!!prediction.predicted_winner_name && (
                          <div className="grid grid-cols-2 gap-2">
                            <Label>Prediksi Pemenang</Label>
                            <Label>{prediction.predicted_winner_name}</Label>
                          </div>
                        )}
                        {!!prediction.predicted_total_goals && (
                          <div className="grid grid-cols-2 gap-2">
                            <Label>Prediksi Total Gol</Label>
                            <Label>{prediction.predicted_total_goals}</Label>
                          </div>
                        )}
                      </div>
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
