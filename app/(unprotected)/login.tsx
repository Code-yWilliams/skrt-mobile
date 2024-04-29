import { colors } from '@/theme'
import { t } from 'i18next'
import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native'
import { ThemedButton, ThemedTextInput } from '~components/themed'
import { Formik } from 'formik'
import { getApiError } from '~lib/api/Base'
import { Auth } from '~lib/api/Auth'

const Login = () => {
  const login = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      const response = await Auth.login(email, password)
      console.log(response)
    } catch (error) {
      const apiError = getApiError(error)
      console.log(apiError)
    }
  }

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
            GiftShit
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
                    handleSubmit as any as (
                      event: GestureResponderEvent,
                    ) => void
                  }
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
