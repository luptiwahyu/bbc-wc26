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
import { MATCH_STATUSES } from '@/shared/constants'
import { capitalize } from '@/shared/lib/utils'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useCountries, useInsertMatch } from '../hooks'
import {
  MatchCreateForm,
  MatchInsert,
  MatchStatus,
} from '../models/match.types'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Props {
  data: MatchCreateForm
}

const MatchCreateManagement: FC<Props> = ({ data }) => {
  const [form, setForm] = useState<MatchCreateForm>(data)
  const { data: countries } = useCountries()
  const insertMatch = useInsertMatch()
  const router = useRouter()

  const handleChangeField = (field: string, value: string): void => {
    setForm({ ...form, [field]: value })
  }

  const saveMatch = (): void => {
    const datetime: string = new Date(`${form.date}T${form.time}`).toISOString()
    const newMatch: MatchInsert = {
      home_team_id: form.home_team_id,
      away_team_id: form.away_team_id,
      date: datetime,
      status: form.status as MatchStatus,
    }

    const createPromise = new Promise((resolve, reject) => {
      insertMatch.mutate(newMatch, {
        onSuccess: () => {
          setForm(data)
          router.push('/match/update')
          resolve('OK')
        },
        onError: reject,
      })
    })

    toast.promise(createPromise, {
      loading: 'Memproses...',
      success: () => 'Berhasil menambahkan pertandingan',
      error: (error) => `Upps ada error. ${error.message}`,
    })
  }

  const disabledSave = () => {
    return (
      !form.home_team_id ||
      !form.away_team_id ||
      !form.date ||
      !form.time ||
      !form.status ||
      insertMatch.isPending
    )
  }

  return (
    <Card>
      <CardContent>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="home">Home Team</FieldLabel>
              <NativeSelect
                id="home"
                className="w-full"
                value={form.home_team_id}
                onChange={(e) =>
                  handleChangeField('home_team_id', e.target.value)
                }
              >
                <NativeSelectOption value="">Pilih</NativeSelectOption>
                {countries?.map((country) => (
                  <NativeSelectOption key={country.id} value={country.id}>
                    {country.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="away">Away Team</FieldLabel>
              <NativeSelect
                id="away"
                className="w-full"
                value={form.away_team_id}
                onChange={(e) =>
                  handleChangeField('away_team_id', e.target.value)
                }
              >
                <NativeSelectOption value="">Pilih</NativeSelectOption>
                {countries?.map((country) => (
                  <NativeSelectOption key={country.id} value={country.id}>
                    {country.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="date">Tanggal</FieldLabel>
              <div className="flex gap-2">
                <Input
                  type="date"
                  className="w-fit"
                  value={form.date}
                  onChange={(e) => handleChangeField('date', e.target.value)}
                />
                <Input
                  type="time"
                  step="1"
                  className="w-fit"
                  value={form.time}
                  onChange={(e) => handleChangeField('time', e.target.value)}
                />
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <NativeSelect
                id="status"
                className="w-full"
                value={form.status}
                onChange={(e) => handleChangeField('status', e.target.value)}
              >
                <NativeSelectOption value="">Pilih</NativeSelectOption>
                {MATCH_STATUSES.map((status) => (
                  <NativeSelectOption key={status} value={status}>
                    {capitalize(status)}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
            <Field orientation="horizontal">
              <Button disabled={disabledSave()} onClick={saveMatch}>
                Simpan
              </Button>
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
