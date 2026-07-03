import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import {
  NativeSelect,
  NativeSelectOption,
} from '@/shared/components/ui/native-select'
import Link from 'next/link'
import { FC } from 'react'

const MatchCreateManagement: FC = () => {
  return (
    <Card>
      <CardContent>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="home">Home Team</FieldLabel>
              <NativeSelect id="home" className="w-full">
                <NativeSelectOption value="">Pilih</NativeSelectOption>
                <NativeSelectOption value="BRA">Brasil</NativeSelectOption>
                <NativeSelectOption value="NOR">Norwegia</NativeSelectOption>
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="away">Away Team</FieldLabel>
              <NativeSelect id="away" className="w-full">
                <NativeSelectOption value="">Pilih</NativeSelectOption>
                <NativeSelectOption value="BRA">Brasil</NativeSelectOption>
                <NativeSelectOption value="NOR">Norwegia</NativeSelectOption>
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="date">Tanggal</FieldLabel>
              <Input type="date" className="w-full" />
            </Field>
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <NativeSelect id="status" className="w-full">
                <NativeSelectOption value="">Pilih</NativeSelectOption>
                <NativeSelectOption value="upcoming">
                  Upcoming
                </NativeSelectOption>
                <NativeSelectOption value="live">Live</NativeSelectOption>
                <NativeSelectOption value="finished">
                  Finished
                </NativeSelectOption>
              </NativeSelect>
            </Field>
            <Field orientation="horizontal">
              <Button>Simpan</Button>
              <Button variant="outline" asChild>
                <Link href="/match/manage">Batal</Link>
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  )
}

export default MatchCreateManagement
