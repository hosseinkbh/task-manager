import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModelDefinition } from "../../models/user.model";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([UserModelDefinition]),
    ConfigModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
