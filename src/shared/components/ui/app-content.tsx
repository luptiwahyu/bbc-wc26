import { FC, ReactNode } from 'react'
import { FieldGroup, FieldSet } from './field'
import AppHeader from './app-header'

interface Props {
  children?: ReactNode
}

const AppContent: FC<Props> = ({ children }) => {
  return (
    <FieldGroup>
      <FieldSet>
        <AppHeader />
        {children}
      </FieldSet>
    </FieldGroup>
  )
}

export default AppContent
