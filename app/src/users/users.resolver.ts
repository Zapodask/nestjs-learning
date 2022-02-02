import { Args, Query, Resolver } from '@nestjs/graphql'

import { User } from '@models/user.entity'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Buscar usuários
  @Query(() => [User])
  public async getTools(
    @Args('page', { nullable: true }) page: number,
    @Args('perPage', { nullable: true }) perPage: number,
  ): Promise<User[]> {
    const { users } = await this.usersService.findAll(page, perPage)

    return users
  }
}
