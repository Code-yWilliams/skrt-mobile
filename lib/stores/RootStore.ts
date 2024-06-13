import { makeAutoObservable } from 'mobx'
import UserStore from './UserStore'

class RootStore {
  userStore: UserStore

  constructor() {
    this.userStore = new UserStore(this)

    makeAutoObservable(this)
  }
}

export default RootStore
