import { Injectable } from '@nestjs/common'
import { User } from '@models/user.entity'
import { compareSync } from 'bcrypt'

import { UsersService } from '@src/users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id }

    return {
      token: this.jwtService.sign(payload),
    }
  }

  async validateUser(email: string, password: string) {
    let user: User
    try {
      user = await this.usersService.findOne(
        { email },
        { select: ['id', 'email', 'password'] },
      )
    } catch (error) {
      return null
    }

    const isPasswordValid = compareSync(password, user.password)
    if (!isPasswordValid) return null

    return user
  }
}
