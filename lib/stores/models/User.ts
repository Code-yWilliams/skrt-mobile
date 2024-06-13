import { IUser } from '@/interfaces/shared'

class User {
  id: number
  name: string
  email: string

  constructor(user: IUser) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
  }
}

export default User
