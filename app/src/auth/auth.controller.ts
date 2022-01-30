import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ErrorSwagger } from '@src/swagger/error.swagger'

import { LoginSwagger } from '@swagger/auth.swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Login efetuado com sucesso',
    type: LoginSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Email ou senha inválido',
    type: ErrorSwagger,
  })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password)

    if (!user) {
      if (!user) throw new UnauthorizedException('Email ou senha inválido')
    }

    return await this.authService.login(user)
  }
}
