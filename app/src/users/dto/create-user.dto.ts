import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    description: 'Email do usuário',
    type: String,
  })
  email: string

  @ApiProperty()
  password: string
}
