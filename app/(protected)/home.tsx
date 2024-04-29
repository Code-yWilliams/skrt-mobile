import { Button, Text, View } from 'react-native'
import { useAuthMutations, useAuthToken } from '~lib/reactQuery/hooks/auth'

const Home = () => {
  const authToken = useAuthToken()
  const { logout } = useAuthMutations()

  return (
    <View className="mt-[50px]">
      <Text>Poop</Text>
      <Text>{authToken}</Text>
      <Button onPress={() => logout()} title="logout" />
    </View>
  )
}

export default Home
