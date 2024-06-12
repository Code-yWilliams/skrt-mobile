import { useMutation, useQuery } from '@tanstack/react-query'
import { ACCESS_TOKEN_KEY, CURRENT_USER_KEY } from '../keys'
import { IUser } from '@/interfaces/shared'
import { Auth } from '~lib/api/Auth'
import DeviceStorage from '~lib/utils/DeviceStorage'
import { queryClient } from '../queryClient'
import toaster from '~lib/toaster'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

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

export const useAccessToken = () => {
  const { data } = useQuery({
    queryKey: [ACCESS_TOKEN_KEY],
    queryFn: async () => {
      const token = await DeviceStorage.getSecureItem('accessToken')
      return token || ''
    },
    staleTime: Infinity,
  })

  return data
}

export const useAuthenticateAccessToken = () => {
  return useQuery({
    queryKey: ['authenticateAccessToken'],
    queryFn: async () => {
      const response = await Auth.authenticateAccessToken()
      if (!response.authenticated) {
        throw new Error('User not authenticated')
      }
      return true
    },
  })
}

export const useInitialAuth = () => {
  const [initialized, setInitialized] = useState(false)

  const { isError, isPending } = useAuthenticateAccessToken()

  useEffect(() => {
    if (isPending || initialized) return

    if (isError) {
      DeviceStorage.removeItem('user')
      DeviceStorage.removeSecureItem('accessToken')
    }

    setInitialized(true)
  }, [isError, isPending])

  return { initialized }
}

const invalidateAccessToken = () =>
  queryClient.invalidateQueries({
    queryKey: [ACCESS_TOKEN_KEY],
    refetchType: 'active',
  })

export const storeCurrentUser = async (user: IUser) => {
  await DeviceStorage.setItem('user', user)
  return user
}

export const storeAccessToken = async (token: string) => {
  await DeviceStorage.setSecureItem('accessToken', token)
  return token
}

export const removeAccessToken = async () => {
  await DeviceStorage.removeSecureItem('accessToken')
}

export const useAuthMutations = () => {
  const { mutate: setCurrentUser } = useMutation({
    mutationFn: storeCurrentUser,
    onSuccess: invalidateCurrentUser,
  })

  const { mutate: setAccessToken } = useMutation({
    mutationFn: storeAccessToken,
    onSuccess: invalidateAccessToken,
  })

  const { mutate: login } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return Auth.login(email, password)
    },
    onSuccess: (data): void => {
      const { accessToken, refreshToken, user } = data

      setCurrentUser(user)
      setAccessToken(accessToken)
    },
    onError: (e) => {
      toaster.error(t('generic_error'))
    },
  })

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await DeviceStorage.removeItem('user')
      await DeviceStorage.removeSecureItem('accessToken')
    },
    onSuccess: () => {
      invalidateAccessToken()
      invalidateCurrentUser()
    },
  })

  return {
    login,
    logout,
    setCurrentUser,
    setAccessToken,
  }
}
