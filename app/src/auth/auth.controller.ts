import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password)

    if (!user) {
      if (!user) throw new UnauthorizedException('Email ou senha inválido')
    }

    return await this.authService.login(user)
  }
}
