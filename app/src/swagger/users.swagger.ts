import { User } from '@models/user.entity'
import { ApiProperty, OmitType } from '@nestjs/swagger'

export class UserSwagger extends OmitType(User, ['password']) {}

export class PaginatedUsers {
  @ApiProperty({ type: [UserSwagger] })
  users: UserSwagger[]

  @ApiProperty()
  page: number

  @ApiProperty()
  lastPage: number

  @ApiProperty()
  perPage: number

  @ApiProperty()
  total: number
}
