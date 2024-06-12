import { Slot, router } from 'expo-router'
import { useEffect } from 'react'
import { useAccessToken, useCurrentUser } from '~lib/reactQuery/hooks/auth'

const ProtectedLayout = () => {
  const user = useCurrentUser()
  const accessToken = useAccessToken()

  useEffect(() => {
    if (!user || !accessToken) return router.replace('/login')
  }, [user, accessToken])

  return <Slot />
}

export default ProtectedLayout
