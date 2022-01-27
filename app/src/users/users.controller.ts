import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { UserSwagger } from '@swagger/users.swagger'
import { ErrorSwagger } from '@swagger/error.swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar usuários' })
  @ApiResponse({
    status: 200,
    description: 'Usuários listados',
    type: UserSwagger,
    isArray: true,
  })
  findAll() {
    return this.usersService.findAll()
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
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id)

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return user
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário modificado' })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: ErrorSwagger,
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto)

    if (user.affected !== 1) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return { message: 'Usuário modificado' }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado' })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: ErrorSwagger,
  })
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(+id)

    if (user.affected !== 1) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return { message: 'Usuário deletado' }
  }
}
