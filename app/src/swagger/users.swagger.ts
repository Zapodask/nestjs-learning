import { User } from '@models/user.entity'
import { OmitType } from '@nestjs/swagger'

export class UserSwagger extends OmitType(User, ['password']) {}
