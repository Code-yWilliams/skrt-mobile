import { Slot, router } from 'expo-router'
import { useEffect } from 'react'
import { useAuthToken, useCurrentUser } from '~lib/reactQuery/hooks/auth'

const ProtectedLayout = () => {
  const user = useCurrentUser()
  const authToken = useAuthToken()

  useEffect(() => {
    if (!user || !authToken) return router.replace('/login')
  }, [user, authToken])

  return <Slot />
}

export default ProtectedLayout
