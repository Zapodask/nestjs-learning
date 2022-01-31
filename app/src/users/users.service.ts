import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindConditions, FindOneOptions, Repository } from 'typeorm'

import { User } from '@models/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) public readonly usersRepository: Repository<User>,
  ) {}

  async findAll(page = 1, perPage = 10) {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    })

    return {
      users: users,
      page: page,
      lastPage: Math.ceil(total / perPage),
      perPage: perPage,
      total: total,
    }
  }

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

    delete save.password

    return save
  }

  async findOne(
    conditions: FindConditions<User>,
    findOneOptions?: FindOneOptions<User>,
  ) {
    try {
      return await this.usersRepository.findOneOrFail(
        conditions,
        findOneOptions,
      )
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado')
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.update(id, updateUserDto)

    if (user.affected !== 1) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return { message: 'Usuário alterado' }
  }

  async remove(id: number) {
    const user = await this.usersRepository.delete(id)

    if (user.affected !== 1) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return { message: 'Usuário deletado' }
  }
}
