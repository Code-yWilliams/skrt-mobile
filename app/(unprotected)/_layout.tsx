import { Slot, router } from 'expo-router'
import { useEffect } from 'react'
import { useAccessToken, useCurrentUser } from '~lib/reactQuery/hooks/auth'

const Layout = () => {
  const user = useCurrentUser()
  const accessToken = useAccessToken()

  useEffect(() => {
    if (user && accessToken) router.replace('/home')
  }, [user, accessToken])

  return <Slot />
}

export default Layout
