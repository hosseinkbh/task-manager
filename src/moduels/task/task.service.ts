import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateTaskDto, FilterListTasksDto, UpdateTaskDto } from "./task.dto";
import { StatuEnum, TaskModel } from "../../models/task.model";
import { SessionType } from "../../types/type";
import { I18nService } from "nestjs-i18n";
import { UserModel } from "../../models/user.model";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly i18nService: I18nService
  ) {}

  async createTask(body: CreateTaskDto, session: SessionType) {
    let validatedBody: any = {};
    validatedBody = this.removeNulls(body);
    validatedBody.createdBy = session.user.id;
    const tasksCount = await this.taskModel.countDocuments();
    validatedBody.task_id = tasksCount + 1;
    await this.taskModel.create({ ...validatedBody, status: StatuEnum.TODO });
  }

  async getTask(id: string) {
    return this.taskModel
      .findById(id)
      .populate("assigne", ["first_name", "last_name"]);
  }

  async updateTask(id: string, body: UpdateTaskDto, session: SessionType) {
    const task = await this.taskModel.findById(id);
    if (task && task.createdBy.toString() !== session.user.id)
      throw new UnauthorizedException(
        "YOU_ARE_NOT_AUTHORIZE_TO_DO_THIS_ACTION"
      );
    const validatedBody = this.removeNulls(body);
    await this.taskModel.findByIdAndUpdate(id, validatedBody);
  }

  async listTasks(filter: FilterListTasksDto) {
    let queryFilter: any = {};
    queryFilter = this.removeNulls(filter);
    if (filter.title) queryFilter.title = { $regex: `/${filter.title}/` };
    return this.taskModel
      .find(queryFilter)
      .populate("assigne", ["first_name", "last_name"]);
  }

  async listAssigneTasks(session: SessionType) {
    return this.taskModel.find({ assigne: session.user.id });
  }

  async CreateTaskUsers() {
    const users = await this.userModel.find(
      {},
      { first_name: 1, last_name: 1, _id: 1 }
    );
    return users;
  }

  private removeNulls(payload: any) {
    let result: any = {};
    for (const [key, value] of Object.entries(payload)) {
      if (value) result[key] = value;
    }
    return result;
  }
}
