import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Render,
  Session,
} from '@nestjs/common';
import {
  CreateTaskDto,
  FilterListTasksDto,
  MongoIdDto,
  UpdateTaskDto,
} from './task.dto';
import { TaskService } from './task.service';
import { SessionType } from '../../types/type';
import { PriorityType, TaskStatus } from '../../models/task.model';

// @UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Render('create')
  @Get('view/create')
  async createTaskView() {
    const users = await this.taskService.CreateTaskUsers();
    return { PriorityEnum: PriorityType, users: users };
  }

  @Get('/get/:id')
  async getTask(@Param() { id }: MongoIdDto) {
    return this.taskService.getTask(id);
  }

  @Redirect('/task/board')
  @Post('create')
  async createTask(
    @Session() session: SessionType,
    @Body() body: CreateTaskDto,
  ) {
    await this.taskService.createTask(body, session);
  }

  @Render('edit')
  @Get('/view/edit/:id')
  async updateTaskView(
    @Session() session: SessionType,
    @Param() { id }: MongoIdDto,
  ) {
    const users = await this.taskService.CreateTaskUsers();

    const task = await this.taskService.getTask(id);
    return { task: task, PriorityEnum: PriorityType, users: users };
  }

  @Redirect('/task/board')
  @Post('/update/:id')
  async updateTask(
    @Session() session: SessionType,
    @Param() { id }: MongoIdDto,
    @Body() body: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, body, session);
  }

  @Render('board')
  @Get('/board')
  async listTasks(@Query() filter: FilterListTasksDto) {
    const tasks = await this.taskService.listTasks(filter);
    return { tasks, StatusEnum: TaskStatus };
  }

  @Get('/assignes')
  async listAssignTasks(@Session() session: SessionType) {
    return this.taskService.listAssignTasks(session);
  }
}
