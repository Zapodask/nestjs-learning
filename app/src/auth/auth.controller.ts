import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Request } from 'express'

import { ErrorSwagger } from '@swagger/error.swagger'
import { LoginSwagger } from '@swagger/auth.swagger'
import { AuthService } from './auth.service'
import { ChangePasswordDto } from './dto/change-password.dto'
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

  @Put('change-password')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Trocar senha' })
  @ApiResponse({
    status: 200,
    description: 'Senha alterada',
    type: LoginSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Senha inválida',
    type: ErrorSwagger,
  })
  @ApiBearerAuth()
  async changePassword(@Req() req: Request, @Body() body: ChangePasswordDto) {
    return await this.authService.changePassword(
      req.user['id'],
      body.password,
      body.newPassword,
    )
  }
}
