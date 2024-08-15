import { Redirect, Slot } from 'expo-router'
import { useUserQuery } from '~lib/query/hooks/useUser'

const Layout = () => {
  const user = useUserQuery()

  if (user) return <Redirect href="/lists" />

  return <Slot />
}

export default Layout
