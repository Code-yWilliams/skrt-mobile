import { useContext } from 'react'

import { StoreContext } from '~contexts/storeContext'

import RootStore from './RootStore'
import UserStore from './UserStore'
import User from './models/User'

export const useRootStore = (): RootStore => useContext(StoreContext)
export const useUserStore = (): UserStore => useRootStore().userStore
export const useCurrentUser = (): User | null => useUserStore().currentUser
