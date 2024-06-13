import { Redirect, Slot } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { useCurrentUser } from '~lib/stores/hooks'

const ProtectedLayout = observer(() => {
  const user = useCurrentUser()

  if (!user) return <Redirect href="/login" />

  return <Slot />
})

export default ProtectedLayout
