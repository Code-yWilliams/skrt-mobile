import Base from './Base'

export class Auth extends Base {
  static async login(email: string, password: string) {
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
}
