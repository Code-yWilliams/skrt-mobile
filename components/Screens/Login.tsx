import { Button, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useState } from 'react'

const LoginScreen = () => {
  const [wide, setWide] = useState(false)
  const width = useSharedValue(100)
  const translateX = useSharedValue(0)

  const handlePress = () => {
    translateX.value = withSpring(translateX.value + 1.03)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <Animated.View
          style={[
            {
              width,
              height: 100,
              backgroundColor: 'red',
            },
            {
              transform: [
                {
                  translateX,
                },
              ],
            },
          ]}
        />
      </SafeAreaView>
      <Button
        onPress={() => {
          setWide((prev) => {
            return !prev
          })
          width.value = withSpring(wide ? 100 : 200, {
            damping: 10,
            stiffness: 100,
          })
          handlePress()
        }}
        title="Toggle"
      />
    </ScrollView>
  )
}

export default LoginScreen
