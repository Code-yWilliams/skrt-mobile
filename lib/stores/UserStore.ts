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
    try {
      await this.loginFromStoredCredentials()
    } catch {
    } finally {
      this.setInitialized(true)
    }
  }

  loginFromStoredCredentials = async () => {
    const user = await DeviceStorage.getSecureItem('user')

    if (!user) return

    const authenticated = await Auth.authenticateMobileAuthToken()

    if (!authenticated) return

    this.setCurrentUser(user)
  }

  login = async ({ email, password }: { email: string; password: string }) => {
    try {
      this.setLoading(true)
      const { user } = await Auth.login(email, password)
      console.log({ user })

      await DeviceStorage.setSecureItem('user', user)
      this.setCurrentUser(user)
    } catch (error) {
    } finally {
      this.setLoading(false)
    }
  }

  logout = () => {
    this.setCurrentUser(null)
    DeviceStorage.removeSecureItem('user')
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
