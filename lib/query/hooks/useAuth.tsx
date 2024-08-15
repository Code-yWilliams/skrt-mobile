import { useMutation } from '@tanstack/react-query'
import { Auth } from '~lib/api/Auth'
import keys from '../keys'
import DeviceStorage from '~lib/utils/DeviceStorage'

import { queryClient } from '~lib/query/queryClient'

export const useAuthMutations = () => {
  const { mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      Auth.login(email, password),
    onSuccess: (data) => {
      DeviceStorage.setSecureItem('user', data.user)
      queryClient.setQueryData(keys.user, data.user)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const { mutateAsync: loginFromStoredCredentials } = useMutation({
    mutationFn: async () => {
      const defaultData = { user: null }

      const user = await DeviceStorage.getSecureItem('user')
      if (!user) return defaultData

      const authenticated = await Auth.authenticateMobileAuthToken()
      if (!authenticated) return defaultData

      return { user }
    },
    onSuccess: (data) => {
      DeviceStorage.setSecureItem('user', data.user)
      queryClient.setQueryData(keys.user, data.user)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await DeviceStorage.removeSecureItem('user')
      queryClient.setQueryData(keys.user, null)
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    login,
    loginFromStoredCredentials,
    logout,
  }
}
