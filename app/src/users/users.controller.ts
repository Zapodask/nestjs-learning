import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'

import { PaginatedUsers, UserSwagger } from '@swagger/users.swagger'
import { ErrorSwagger } from '@swagger/error.swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { Message } from '@swagger/basic.swagger'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar usuários' })
  @ApiResponse({
    status: 200,
    description: 'Usuários listados com sucesso',
    type: PaginatedUsers,
    isArray: true,
  })
  @ApiBearerAuth()
  findAll(@Query('page') page: number, @Query('perPage') perPage: number) {
    return this.usersService.findAll(page, perPage)
  }

  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado',
    type: UserSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Email já cadastrado',
    type: ErrorSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: ErrorSwagger,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Buscar usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
    type: UserSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: ErrorSwagger,
  })
  @ApiBearerAuth()
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne({ id })
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado',
    type: Message,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: ErrorSwagger,
  })
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id)
  }
}
