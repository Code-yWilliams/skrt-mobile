import { createContext } from 'react'

import RootStore from '~stores/RootStore'

export const rootStore = new RootStore()
export const StoreContext = createContext(rootStore)
export const { Provider } = StoreContext
