import { FC } from 'react'
import { FieldDescription, FieldLegend } from './field'

const AppHeader: FC = () => {
  return (
    <>
      <FieldLegend>Wahyu</FieldLegend>
      <FieldDescription className="bg-linear-to-r from-usa via-mexico to-canada bg-clip-text text-transparent w-fit bg-yellow-100">
        Bangbayang FWC 26
      </FieldDescription>
    </>
  )
}

export default AppHeader
