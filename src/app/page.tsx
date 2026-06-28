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
  FieldLegend,
  FieldSet,
} from '@/shared/components/ui/field'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/shared/components/ui/item'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const [players] = useState<string[]>(['Askur', 'Caki', 'Dimas'])
  const router = useRouter()

  const selectPlayer = (): void => {}

  const next = (): void => {
    router.push('/match')
  }

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Halo, Wahyu!</FieldLegend>
        <FieldDescription>Bangbayang World Cup 26</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel>Pilih Pemain</FieldLabel>
            {players.map((player, playerIdx) => (
              <Item
                variant="outline"
                key={playerIdx}
                className="cursor-pointer"
                onClick={selectPlayer}
              >
                <ItemMedia>
                  <Avatar className="size-6">
                    <AvatarImage src="https://github.com/evilrabbit.png" />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{player}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <Button
                    size="icon-sm"
                    variant="outline"
                    className="rounded-full"
                    aria-label="Invite"
                  >
                    <PlusIcon />
                  </Button>
                </ItemActions>
              </Item>
            ))}
            <Button className="mt-2" size="lg" onClick={next}>
              LANJUT
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
