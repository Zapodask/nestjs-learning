import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import * as ormConfig from './config/db'

@Module({
  imports: [
    // Typeorm config
    TypeOrmModule.forRootAsync({
      useFactory: () => ormConfig,
    }),

    // Modules
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
