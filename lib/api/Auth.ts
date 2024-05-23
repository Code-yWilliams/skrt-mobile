import { IUser } from '@/interfaces/shared'
import Base from './Base'

export type LoginResponse = {
  user: IUser
  token: string
}

export type signupResponse = {
  user: IUser
}

export class Auth extends Base {
  static async login(email: string, password: string): Promise<LoginResponse> {
    const data = { email, password }
    return this.post('/login', data)
  }

  static async signup(
    email: string,
    password: string,
    passwordConfirmation: string,
  ) {
    const data = { email, password, passwordConfirmation }
    return this.post('/signup', data)
  }

  // TODO: remove this - just for testing authenticated route
  static async users() {
    return this.get<IUser[]>('/users')
  }
}
