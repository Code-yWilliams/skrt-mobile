import { Redirect, Slot } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { useCurrentUser } from '~lib/stores/hooks'

const Layout = observer(() => {
  const user = useCurrentUser()

  if (user) return <Redirect href="/lists" />

  return <Slot />
})

export default Layout
