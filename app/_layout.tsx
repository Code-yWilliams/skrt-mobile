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
import { QueryClientProvider } from '~lib/query/queryClient'
import { Provider as StoreProvider } from '~contexts/storeContext'
import { useRootStore, useUserStore } from '~lib/stores/hooks'
import { observer } from 'mobx-react-lite'

export {
  ErrorBoundary, // Catch any errors thrown by the Layout component.
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

setupI18n()

SplashScreen.preventAutoHideAsync() // Prevent the splash screen from auto-hiding before asset loading is complete.

const RootLayoutNav = observer(() => {
  const insets = useSafeAreaInsets()

  const { initialized: authInitialized } = useUserStore()

  useEffect(() => {
    if (authInitialized) {
      SplashScreen.hideAsync()
    }
  }, [authInitialized])

  return (
    <>
      <Slot />
      <Toast config={toastConfig} topOffset={insets.top} />
    </>
  )
})

const RootLayout = observer(() => {
  const rootStore = useRootStore()

  return (
    <>
      <StoreProvider value={rootStore}>
        <QueryClientProvider>
          <SafeAreaProvider>
            <RootLayoutNav />
          </SafeAreaProvider>
        </QueryClientProvider>
      </StoreProvider>
    </>
  )
})

export default RootLayout
