import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from "@nestjs/common";
import {
  CreateTaskDto,
  FilterListTasksDto,
  MongoIdDto,
  UpdateTaskDto,
} from "./task.dto";
import { Types } from "mongoose";
import { TaskService } from "./task.service";
import { SessionType } from "../../types/type";
import { AuthGuard } from "../../gurds/custom.auth.guard";

@UseGuards(AuthGuard)
@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post("/create")
  async createTask(
    @Session() session: SessionType,
    @Body() body: CreateTaskDto
  ) {
    return this.taskService.createTask(body, session);
  }
  @Put("/update")
  async updateTask(
    @Session() session: SessionType,
    @Param() { id }: MongoIdDto,
    @Body() body: UpdateTaskDto
  ) {
    return this.taskService.updateTask(id, body, session);
  }
  @Get("/list")
  async listTasks(
    @Session() session: SessionType,
    @Query() filter: FilterListTasksDto
  ) {
    return this.taskService.listTasks(filter);
  }
  @Get("/createds")
  async listCreatedTasks(@Session() session: SessionType) {
    return this.taskService.listCreatedTasks(session);
  }
  @Get("/assignes")
  async listAssigneTasks(@Session() session: SessionType) {
    return this.taskService.listAssigneTasks(session);
  }
}
