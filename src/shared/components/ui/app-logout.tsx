import { appStorage } from '@/shared/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { Separator } from './separator'
import { LogOutIcon } from 'lucide-react'

const AppLogout = () => {
  const router = useRouter()
  const params = useSearchParams()
  const logoutVisible: boolean = params.get('logout') === 'true'

  const logout = (): void => {
    appStorage.clearByPrefix()
    setTimeout(() => {
      router.push('/')
    }, 300)
  }

  if (logoutVisible) {
    return (
      <>
        <Separator orientation="vertical" />
        <div className="cursor-pointer hover:underline" onClick={logout}>
          <div className="flex space-x-1">
            <span>Logout</span>
            <LogOutIcon size={14} />
          </div>
        </div>
      </>
    )
  }
}

export default AppLogout
