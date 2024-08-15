import { Redirect, Slot, Stack } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { useCurrentUser } from '~lib/stores/hooks'

const ProtectedLayout = observer(() => {
  const user = useCurrentUser()

  if (!user) return <Redirect href="/login" />

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
})

export default ProtectedLayout
