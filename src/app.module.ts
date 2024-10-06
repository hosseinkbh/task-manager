import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskModule } from "./moduels/task/task.module";
import { UserModule } from "./moduels/user/user.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { ThrottlerStorageRedisService } from "nestjs-throttler-storage-redis";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow("MONGODB_URI"),
        connectionFactory(connection) {
          connection.on("connected", () =>
            console.log("######### MongoDB is connected successfully #########")
          );
          connection._events.connected();
          return connection;
        },
      }),
    }),
    TaskModule,
    UserModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          throttlers: [{ limit: 60, ttl: 3600 * 1000 }],
          storage: new ThrottlerStorageRedisService(
            `redis://${configService.getOrThrow(
              "REDIS_HOST"
            )}:${configService.getOrThrow(
              "REDIS_PORT"
            )}/${configService.getOrThrow("THROTTLER_REDIS_DB")}`
          ),
        };
      },
    }),
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: CustomThrottlerGuard }],
})
export class AppModule {}
