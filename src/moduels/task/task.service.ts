import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, RootFilterQuery, Types } from 'mongoose';
import { CreateTaskDto, FilterListTasksDto, UpdateTaskDto } from './task.dto';
import { TaskModel, TaskStatus } from '../../models/task.model';
import { SessionType } from '../../types/type';
import { UserModel } from '../../models/user.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  async createTask(body: CreateTaskDto, session: SessionType) {
    const normalizedBody = this.removeNulls<CreateTaskDto>(body);
    const tasksCount = await this.taskModel.countDocuments();
    const task: TaskModel = {
      ...normalizedBody,
      createdBy: new Types.ObjectId(session.user.id),
      taskId: (tasksCount + 1).toString(),
      status: TaskStatus.TODO,
      assign: undefined,
    };
    (normalizedBody.assign && isValidObjectId(normalizedBody.assign)) && 
      (task.assign = new Types.ObjectId(normalizedBody.assign));

    await this.taskModel.create(task);
  }

  async getTask(id: string) {
    return this.taskModel
      .findById(id)
      .populate('assign', ['firstName', 'lastName']);
  }

  async updateTask(id: string, body: UpdateTaskDto, session: SessionType) {
    const task = await this.taskModel.findById(id);
    if (task && task.createdBy.toString() !== session.user.id)
      throw new UnauthorizedException(
        'YOU_ARE_NOT_AUTHORIZE_TO_DO_THIS_ACTION',
      );
    const normalizedBody = this.removeNulls<UpdateTaskDto>(body);
    await this.taskModel.findByIdAndUpdate(id, normalizedBody);
  }

  async listTasks(filter: FilterListTasksDto) {
    let normalizedBody = this.removeNulls<FilterListTasksDto>(filter);
    const queryFilter: RootFilterQuery<TaskModel> = { ...normalizedBody };
    filter.title && (queryFilter.title = { $regex: `/${filter.title}/` });
    return this.taskModel
      .find(queryFilter)
      .populate('assign', ['firstName', 'lastName']);
  }

  async listAssignTasks(session: SessionType) {
    return this.taskModel.find({ assign: session.user.id });
  }

  async CreateTaskUsers() {
    const users = await this.userModel.find(
      {},
      { firstName: 1, lastName: 1, _id: 1 },
    );
    return users;
  }

  private removeNulls<T extends object>(payload: T): T {
    for (const [key, value] of Object.entries(payload)) {
      if (!value) delete payload[key as keyof T];
    }
    return payload;
  }
}
