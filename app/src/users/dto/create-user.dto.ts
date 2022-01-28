import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

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
}
