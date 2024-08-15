import { useContext } from 'react'

import { StoreContext } from '~contexts/storeContext'

import RootStore from './RootStore'

export const useRootStore = (): RootStore => useContext(StoreContext)
