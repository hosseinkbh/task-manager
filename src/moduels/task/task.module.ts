import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskController } from "./task.controller";
import { TaskModelDefinition } from "../../models/task.model";

@Module({
  imports: [MongooseModule.forFeature([TaskModelDefinition])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
