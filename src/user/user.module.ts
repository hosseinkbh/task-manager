import { Module } from "@nestjs/common";
import mongoose from "mongoose";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModelDefinition } from "../models/user.model";

@Module({
  imports: [MongooseModule.forFeature([UserModelDefinition])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
