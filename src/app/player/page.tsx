'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import {
  Field,
  FieldDescription,
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
import { SportShoeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Player {
  id: string
  name: string
  avatar_url: string
}

const dataPlayers: Player[] = [
  {
    id: '1',
    name: 'Askur',
    avatar_url: 'https://avatars.githubusercontent.com/u/6880091?v=4',
  },
  {
    id: '2',
    name: 'Caki',
    avatar_url: 'https://avatars.githubusercontent.com/u/6880092?v=4',
  },
  {
    id: '3',
    name: 'Dimas',
    avatar_url: 'https://avatars.githubusercontent.com/u/6880093?v=4',
  },
]

export default function Player() {
  const router = useRouter()
  const [players] = useState<Player[]>(dataPlayers)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  const selectPlayer = (player: Player): void => {
    setSelectedPlayer(player)
  }

  const submit = (): void => {
    router.push('/match')
  }

  return (
    <FieldGroup>
      <FieldSet>
        <FieldDescription>Bangbayang FWC 26</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel>Pilih Pemain</FieldLabel>
            {players.map((player, playerIdx) => (
              <Item
                variant="outline"
                key={playerIdx}
                className="cursor-pointer"
                onClick={() => selectPlayer(player)}
              >
                <ItemMedia>
                  <Avatar className="size-6">
                    <AvatarImage src={player.avatar_url} />
                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{player.name}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  {selectedPlayer?.id === player.id && (
                    <SportShoeIcon size={20} className="text-mexico" />
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
              LANJUT
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
