import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskModule } from "./moduels/task/task.module";
import { TaskService } from "./moduels/task/task.service";
import { UserModule } from "./moduels/user/user.module";
import { UserService } from "./moduels/user/user.service";

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
  ],
  controllers: [],
  providers: [UserService, TaskService],
})
export class AppModule {}
