import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './moduels/task/task.module';
import { UserModule } from './moduels/user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { AppController } from './app.controller';
import { AuthModule } from './moduels/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        applicationName: 'task-manager',
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        password: configService.getOrThrow('POSTGRES_PASS'),
        username: configService.getOrThrow('POSTGRES_USER'),
        entities: [],
        database: configService.getOrThrow('POSTGRES_DB'),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGODB_URI'),
        connectionFactory(connection) {
          connection.on('connected', () =>
            console.log(
              '######### MongoDB is connected successfully #########',
            ),
          );
          connection._events.connected();
          return connection;
        },
      }),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'fa',
      loaderOptions: {
        path: join(process.cwd(), 'locales'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          throttlers: [{ limit: 60, ttl: 3600 * 1000 }],
          storage: new ThrottlerStorageRedisService(
            `redis://${configService.getOrThrow(
              'REDIS_HOST',
            )}:${configService.getOrThrow(
              'REDIS_PORT',
            )}/${configService.getOrThrow('THROTTLER_REDIS_DB')}`,
          ),
        };
      },
    }),
    AuthModule,
    TaskModule,
    UserModule,
  ],
  controllers: [AppController],
  // providers: [{ provide: APP_GUARD, useClass: CustomThrottlerGuard }],
})
export class AppModule {}
