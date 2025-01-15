import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import morgan from 'morgan';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app.module';
import EnvironmentVariables, { NodeEnvironments } from './envCheck';
import { join } from 'path';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService<EnvironmentVariables, true>);
  app.useBodyParser('raw');
  app.enableCors({ origin: '*' });
  app.use(
    helmet({
      xPoweredBy: false,
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': ["'self'"],
          'script-src-attr': ["'unsafe-inline'"],
          'script-src': ["'self'", "'unsafe-inline'"],
          'img-src': ["'self'", 'https://*.openstreetmap.org'],
        },
      },
    }),
  );

  const sessionStore = new RedisStore({
    client: new Redis(
      configService.getOrThrow('REDIS_PORT'),
      configService.getOrThrow('REDIS_HOST'),
      {
        db: 10,
      },
    ),
    prefix: 'session:',
  });

  app.use(
    session({
      secret: configService.getOrThrow('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_DEV == NodeEnvironments.DEVELOPMENT,
        maxAge: +configService.getOrThrow('SESSION_TIME'),
        // 120min
      },
      store: sessionStore,
    }),
  );

  app.useGlobalPipes(
    new I18nValidationPipe({
      stopAtFirstError: false,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setViewEngine('pug');
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.useStaticAssets(join(process.cwd(), 'views/css'));
  app.useStaticAssets(join(process.cwd(), 'views/js'));
  app.useStaticAssets(join(process.cwd(), 'views/images'));

  app.use(
    morgan((tokens, req, res) => {
      return [
        tokens.method(req, res),
        tokens.url(req, res)?.split('?')[0],
        '-',
        'STATUS :',
        tokens.status(req, res),
        '-',
        'RESPONSE-TIME : ',
        tokens['response-time'](req, res),
        'ms',
      ].join(' ');
    }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  const PORT = configService.get<number>('PORT');
  await app.listen(PORT, () => {
    console.log(`Nest server is running on port : ${PORT}`);
  });
}

bootstrap();
