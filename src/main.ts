import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from './filters/exception-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  const configService = app.get(ConfigService);

  const reflector = app.get(Reflector);

  const PORT = +configService.get('PORT') || 3050;

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter(reflector));

  const config = new DocumentBuilder()
    .setTitle('Dads Birthday Wishes')
    .setDescription('This service displays dads birthday wishes for 2024')
    .setVersion('1.0')
    .addCookieAuth('access_token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'access_token',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentationView', app, document);

  await app.listen(PORT, () => {
    console.log(`server running on port:: ${PORT}`);
  });

  return app;
}
void bootstrap();
