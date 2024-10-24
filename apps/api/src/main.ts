import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from '~/app.module';
import { CatchEverythingFilter } from '~/common/filters/catch-everything.filter';
import { ResponseInterceptor } from '~/common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const corsOrigins = configService.get('CORS_ORIGIN').split(',');
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost));
  app.use(helmet());
  app.enableCors({ origin: corsOrigins });

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
