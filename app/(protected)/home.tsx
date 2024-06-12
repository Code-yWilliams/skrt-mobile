import { Button, Text, View } from 'react-native'
import { useAuthMutations, useAccessToken } from '~lib/reactQuery/hooks/auth'

const Home = () => {
  const accessToken = useAccessToken()
  const { logout } = useAuthMutations()

  return (
    <View className="mt-[50px]">
      <Text>Poop</Text>
      <Text>{accessToken}</Text>
      <Button onPress={() => logout()} title="logout" />
    </View>
  )
}

export default Home
