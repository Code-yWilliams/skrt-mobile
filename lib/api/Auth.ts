import { IUser } from '@/interfaces/shared'
import Base from './Base'

export type LoginResponse = {
  user: IUser
  accessToken: string
  refreshToken: string
}

export type signupResponse = {
  user: IUser
}

export class Auth extends Base {
  static async login(email: string, password: string): Promise<LoginResponse> {
    const data = { email, password }
    return this.post('/sessions', data)
  }

  static async signup(
    email: string,
    password: string,
    passwordConfirmation: string,
  ) {
    const data = { email, password, passwordConfirmation }
    return this.post('/signup', data)
  }

  static async authenticateMobileAuthToken() {
    const authenticated = await this.get<{ status: boolean }>(
      '/authenticate_access_token',
    )
    return authenticated
  }

  // TODO: remove this - just for testing authenticated route
  static async users() {
    return this.get<IUser[]>('/users')
  }
}
