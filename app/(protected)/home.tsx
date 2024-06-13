import { Button, Text, View } from 'react-native'
import { useUserStore } from '~lib/stores/hooks'

const Home = () => {
  const { logout } = useUserStore()

  return (
    <View className="mt-[50px]">
      <Text>Logged in</Text>
      <Button onPress={() => logout()} title="logout" />
    </View>
  )
}

export default Home
