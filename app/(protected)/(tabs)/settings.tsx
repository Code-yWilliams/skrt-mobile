import { t } from 'i18next'
import { View, Text, StyleSheet, Button } from 'react-native'
import { ThemedButton } from '~components/themed'
import { useUserStore } from '~lib/stores/hooks'

const SettingsTab = () => {
  const { logout } = useUserStore()

  return (
    <View className="flex-1 justify-center items-center p-2">
      <Text>Tab [Settings]</Text>
      <ThemedButton onPress={logout} className="w-full absolute bottom-2">
        {t('log_out')}
      </ThemedButton>
    </View>
  )
}

export default SettingsTab
