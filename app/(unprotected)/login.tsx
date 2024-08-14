import { colors } from '@/theme'
import { t } from 'i18next'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native'
import { ThemedButton, ThemedTextInput } from '~components/themed'
import { Formik } from 'formik'
import { GestureHandlerEvent } from 'react-native-reanimated/lib/typescript/reanimated2/hook'
import { useUserStore } from '~lib/stores/hooks'
import { appName } from '@/constants/strings'

const Login = () => {
  const { login } = useUserStore()

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <KeyboardAvoidingView className="px-8">
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'Courgette_400Regular',
              marginBottom: 12,
              fontSize: 38,
              color: colors.green[500],
            }}
          >
            {appName}
          </Text>
          <Formik onSubmit={login} initialValues={{ email: '', password: '' }}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <ThemedTextInput
                  placeholder={t('email_address')}
                  variant="rounded"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <ThemedTextInput
                  placeholder={t('password')}
                  className="mt-4"
                  variant="rounded"
                  secureTextEntry
                  autoCapitalize="none"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                <ThemedButton
                  className="mt-4 w-full"
                  onPress={
                    handleSubmit as (e: GestureHandlerEvent<any>) => void
                  }
                  disabled={!values.email || !values.password}
                >
                  {t('log_in')}
                </ThemedButton>
              </>
            )}
          </Formik>
          <ThemedButton className="mt-4 w-full" variant="secondary">
            {t('sign_up')}
          </ThemedButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login
