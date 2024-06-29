import { makeAutoObservable } from 'mobx'
import RootStore from './RootStore'
import DeviceStorage from '~lib/utils/DeviceStorage'
import { Auth } from '~lib/api/Auth'
import { IUser } from '@/interfaces/shared'

class UserStore {
  rootStore: RootStore
  currentUser: IUser | null = null
  initialized = false
  loading = false

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.initialize()

    makeAutoObservable(this, { rootStore: false })
  }

  initialize = async () => {
    await this.loginFromStoredCredentials()
    this.setInitialized(true)
  }

  loginFromStoredCredentials = async () => {
    const user = await DeviceStorage.getItem('user')
    const accessToken = await DeviceStorage.getSecureItem('accessToken')

    if (!user || !accessToken) return

    const response = await Auth.authenticateAccessToken()

    if (!response.authenticated) return

    this.setCurrentUser(user)
  }

  login = async ({ email, password }: { email: string; password: string }) => {
    try {
      this.setLoading(true)
      const { user, accessToken, refreshToken } = await Auth.login(
        email,
        password,
      )

      await Promise.all([
        DeviceStorage.setItem('user', user),
        DeviceStorage.setSecureItem('accessToken', accessToken),
        DeviceStorage.setSecureItem('refreshToken', refreshToken),
      ])

      this.setCurrentUser(user)
    } catch (error) {
    } finally {
      this.setLoading(false)
    }
  }

  logout = () => {
    this.setCurrentUser(null)
    DeviceStorage.removeItem('user')
    DeviceStorage.removeSecureItem('accessToken')
    DeviceStorage.removeSecureItem('refreshToken')
  }

  setCurrentUser = (user: IUser | null) => {
    this.currentUser = user
  }

  setLoading = (loading: boolean) => {
    this.loading = loading
  }

  setInitialized = (initialized: boolean) => {
    this.initialized = initialized
  }
}

export default UserStore
