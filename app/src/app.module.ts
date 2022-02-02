import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'

import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import * as ormConfig from './config/db'

@Module({
  imports: [
    // Typeorm config
    TypeOrmModule.forRootAsync({
      useFactory: () => ormConfig,
    }),

    // Graphql config
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),

    // Modules
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
