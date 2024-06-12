import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Courgette_400Regular, useFonts } from '@expo-google-fonts/courgette'
import Toast from 'react-native-toast-message'

import { setupI18n } from '~lib/i18n'
import toastConfig from '~lib/toaster/config'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import { QueryClientProvider } from '~lib/reactQuery/queryClient'
import { useInitialAuth } from '~lib/reactQuery/hooks/auth'

export {
  ErrorBoundary, // Catch any errors thrown by the Layout component.
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

setupI18n()

SplashScreen.preventAutoHideAsync() // Prevent the splash screen from auto-hiding before asset loading is complete.

const RootLayoutNav = () => {
  const insets = useSafeAreaInsets()

  const { initialized: authInitialized } = useInitialAuth()

  const [fontsLoaded] = useFonts({
    Courgette_400Regular,
  })

  useEffect(() => {
    if (fontsLoaded && authInitialized) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, authInitialized])

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <Slot />
      <Toast config={toastConfig} topOffset={insets.top} />
    </>
  )
}

const RootLayout = () => {
  return (
    <>
      <QueryClientProvider>
        <SafeAreaProvider>
          <RootLayoutNav />
        </SafeAreaProvider>
      </QueryClientProvider>
    </>
  )
}

export default RootLayout
