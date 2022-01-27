import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configuração do swagger
  const swagger = new DocumentBuilder()
    .setTitle('Nestjs learning')
    .setDescription('')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(process.env.PORT)
}

bootstrap()
