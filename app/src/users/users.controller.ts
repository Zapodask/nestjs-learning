import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
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
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { FindAllQueryDto } from './dto/find-all-query.dto'

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
  findAll(@Query() query: FindAllQueryDto) {
    return this.usersService.findAll(query.page, query.perPage)
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

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Modificar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário modificado' })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: ErrorSwagger,
  })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto)

    if (user.affected !== 1) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return { message: 'Usuário modificado' }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado' })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: ErrorSwagger,
  })
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(+id)

    if (user.affected !== 1) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return { message: 'Usuário deletado' }
  }
}
