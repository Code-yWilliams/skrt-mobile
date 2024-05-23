import { Slot, router } from 'expo-router'
import { useEffect } from 'react'
import { useAuthToken, useCurrentUser } from '~lib/reactQuery/hooks/auth'

const Layout = () => {
  const user = useCurrentUser()
  const authToken = useAuthToken()

  useEffect(() => {
    if (user && authToken) router.replace('/home')
  }, [user, authToken])

  return <Slot />
}

export default Layout
