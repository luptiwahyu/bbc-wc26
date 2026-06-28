'use client'

import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/shared/components/ui/field'
import { Item } from '@/shared/components/ui/item'
import { CrownIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Match() {
  const [winner, setWinner] = useState<string>('')
  const [matches] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ])

  const selectWinner = (countryCode: string): void => {
    setWinner(countryCode)
  }

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Halo, Wahyu!</FieldLegend>
        <FieldDescription>Bangbayang World Cup 26</FieldDescription>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {matches.map((match, matchIdx) => (
              <Item
                key={matchIdx}
                variant="outline"
                className="w-fit rounded-tr-4xl rounded-bl-4xl px-6"
              >
                <div className="flex space-x-4">
                  <div
                    className="flex flex-col w-[50px] md:w-full items-center space-y-2 cursor-pointer"
                    onClick={() => selectWinner('GER')}
                  >
                    <CrownIcon
                      size={18}
                      className={
                        winner === 'GER'
                          ? 'fill-yellow-400 stroke-1'
                          : 'fill-gray-300 stroke-1 stroke-gray-300'
                      }
                    />
                    <Image
                      src="https://api.fifa.com/api/v3/picture/flags-sq-4/GER"
                      width={200}
                      height={200}
                      alt="flag"
                      loading="eager"
                      className="rounded-tr-2xl rounded-bl-2xl w-full h-auto"
                    />
                    <FieldLabel>Jerman</FieldLabel>
                  </div>
                  <div className="flex items-center justify-center">VS</div>
                  <div
                    className="flex flex-col w-[50px] md:w-full items-center space-y-2 cursor-pointer"
                    onClick={() => selectWinner('FRA')}
                  >
                    <CrownIcon
                      size={18}
                      className={
                        winner === 'FRA'
                          ? 'fill-yellow-400 stroke-1'
                          : 'fill-gray-300 stroke-1 stroke-gray-300'
                      }
                    />
                    <Image
                      src="https://api.fifa.com/api/v3/picture/flags-sq-4/USA"
                      width={200}
                      height={200}
                      alt="flag"
                      loading="eager"
                      className="rounded-tr-2xl rounded-bl-2xl w-full h-auto"
                    />
                    <FieldLabel>Prancis</FieldLabel>
                  </div>
                </div>
              </Item>
            ))}
          </div>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  )
}
