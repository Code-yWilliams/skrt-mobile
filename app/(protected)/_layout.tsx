import { Redirect, Stack } from 'expo-router'
import { useUserQuery } from '~lib/query/hooks/useUser'

const ProtectedLayout = () => {
  const user = useUserQuery()

  if (!user) return <Redirect href="/login" />

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default ProtectedLayout
