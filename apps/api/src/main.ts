import { NestFactory } from '@nestjs/core';
import { AppModule } from '~/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const envMode = configService.get('NODE_ENV');

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: envMode === 'PROD',
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Rent Ease API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, documentFactory);

  await app.listen(port);
}
bootstrap();
