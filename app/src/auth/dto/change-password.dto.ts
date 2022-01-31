import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Senha atual',
    type: String,
  })
  @IsNotEmpty({ message: 'Campo password é necessário' })
  @IsString({ message: 'Campo password é uma string' })
  password: string

  @ApiProperty({
    description: 'Nova senha',
    type: String,
  })
  @IsNotEmpty({ message: 'Campo newPassword é necessário' })
  @IsString({ message: 'Campo newPassword é uma string' })
  newPassword: string
}
