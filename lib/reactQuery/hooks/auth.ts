import { useMutation, useQuery } from '@tanstack/react-query'
import { AUTH_TOKEN_KEY, CURRENT_USER_KEY } from '../keys'
import { IUser } from '@/interfaces/shared'
import { Auth } from '~lib/api/Auth'
import DeviceStorage from '~lib/utils/DeviceStorage'
import { queryClient } from '../queryClient'
import toaster from '~lib/toaster'
import { t } from 'i18next'

export const useCurrentUser = () => {
  const { data } = useQuery({
    queryKey: [CURRENT_USER_KEY],
    queryFn: async () => {
      const user = await DeviceStorage.getItem('user')
      return user || ''
    },
    staleTime: Infinity,
  })

  return data
}

const invalidateCurrentUser = () =>
  queryClient.invalidateQueries({
    queryKey: [CURRENT_USER_KEY],
    refetchType: 'active',
  })

export const useAuthToken = () => {
  const { data } = useQuery({
    queryKey: [AUTH_TOKEN_KEY],
    queryFn: async () => {
      const token = await DeviceStorage.getSecureItem('authToken')
      return token || ''
    },
    staleTime: Infinity,
  })

  return data
}

const invalidateAuthToken = () =>
  queryClient.invalidateQueries({
    queryKey: [AUTH_TOKEN_KEY],
    refetchType: 'active',
  })

export const storeCurrentUser = async (user: IUser) => {
  await DeviceStorage.setItem('user', user)
  return user
}

export const storeAuthToken = async (token: string) => {
  await DeviceStorage.setSecureItem('authToken', token)
  return token
}

export const useAuthMutations = () => {
  const { mutate: setCurrentUser } = useMutation({
    mutationFn: storeCurrentUser,
    onSuccess: invalidateCurrentUser,
  })

  const { mutate: setAuthToken } = useMutation({
    mutationFn: storeAuthToken,
    onSuccess: invalidateAuthToken,
  })

  const { mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return Auth.login(email, password)
    },
    onSuccess: (data): void => {
      const { token, user } = data

      setCurrentUser(user)
      setAuthToken(token)
    },
    onError: (e) => {
      toaster.error(t('generic_error'))
    },
  })

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await DeviceStorage.removeItem('user')
      await DeviceStorage.removeSecureItem('authToken')
    },
    onSuccess: () => {
      invalidateAuthToken()
      invalidateCurrentUser()
    },
  })

  return {
    login,
    logout,
    setCurrentUser,
    setAuthToken,
  }
}
