import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModelDefinition } from "./models/user.model";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserService } from "./user/user.service";

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
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
