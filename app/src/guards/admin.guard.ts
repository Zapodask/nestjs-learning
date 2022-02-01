import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from '@src/users/users.service'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class AdminGuard extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    })
  }

  async validate(payload: { sub: number }) {
    const user = await this.usersService.findOne({ id: payload.sub })

    if (user.acl !== 'admin') {
      throw new UnauthorizedException('Usuário não possui acesso')
    }

    console.log(user)
    return { id: payload.sub }
  }
}
