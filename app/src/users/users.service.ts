import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '@models/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) public readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto

    const tool = await this.usersRepository.create({
      email: email,
      password: password,
    })

    let save = {} as User

    try {
      save = await this.usersRepository.save(tool)
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        throw new ConflictException('email já cadastrado')
      }
    }

    return save
  }

  async findAll() {
    const users = await this.usersRepository.find()

    return users
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id)

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.update(id, updateUserDto)

    return user
  }

  async remove(id: number) {
    const user = await this.usersRepository.delete(id)

    return user
  }
}
