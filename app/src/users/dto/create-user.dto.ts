import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'

export enum Roles {
  Client = 'client',
  Admin = 'admin',
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    type: String,
  })
  @IsNotEmpty({ message: 'Campo email é necessário' })
  @IsEmail({ message: 'Campo email é um email' })
  email: string

  @ApiProperty({
    description: 'Senha do usuário',
    type: String,
  })
  @IsNotEmpty({ message: 'Campo password é necessário' })
  @IsString({ message: 'Campo password é uma string' })
  password: string

  @ApiProperty({
    description: 'Role do usuário',
    type: String,
  })
  @IsNotEmpty({ message: 'Campo acl é necessário' })
  @IsEnum(Roles, { message: 'Campo acl é client ou admin' })
  acl: Roles
}
