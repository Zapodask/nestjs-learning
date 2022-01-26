import * as path from 'path'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST, // Determina se está rodando no docker ou local
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'db',
  entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
}

module.exports = config
