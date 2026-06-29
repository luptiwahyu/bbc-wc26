'use client'

import { usePlayers } from '@/features/player/hooks'
import type { Player } from '@/features/player/models/player.types'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/shared/components/ui/field'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/shared/components/ui/item'
import { Label } from '@/shared/components/ui/label'
import { Spinner } from '@/shared/components/ui/spinner'
import { appStorage } from '@/shared/lib/utils'
import { SportShoeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PlayerPage() {
  const router = useRouter()
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const { data: players, isPending, isSuccess } = usePlayers()

  const selectPlayer = (player: Player): void => {
    setSelectedPlayer(player)
  }

  const submit = (): void => {
    console.log('selectedPlayer: ', selectedPlayer)
    appStorage.set<Player>('player', selectedPlayer!)
    router.push('/match')
  }

  return (
    <FieldGroup>
      <FieldSet>
        <Label className="font-semibold bg-linear-to-r from-usa via-mexico to-canada bg-clip-text text-transparent w-fit bg-yellow-100">
          Bangbayang FWC 26
        </Label>
        <FieldGroup>
          <Field>
            <FieldLabel>Pilih Pemain</FieldLabel>

            {isPending && <Spinner />}

            {isSuccess && (
              <>
                {players?.map((player) => (
                  <Item
                    variant="outline"
                    key={player.id}
                    className="cursor-pointer"
                    onClick={() => selectPlayer(player)}
                  >
                    <ItemMedia>
                      <Avatar className="size-6">
                        <AvatarImage src={player.avatar_url!} />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{player.name}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      {selectedPlayer?.id === player.id && (
                        <SportShoeIcon size={20} className="text-canada" />
                      )}
                    </ItemActions>
                  </Item>
                ))}
                <Button
                  className="mt-2"
                  size="lg"
                  disabled={!selectedPlayer}
                  onClick={submit}
                >
                  Masuk
                </Button>
              </>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
