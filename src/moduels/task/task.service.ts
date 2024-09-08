import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskDto, FilterListTasksDto, UpdateTaskDto } from "./task.dto";
import { TaskModel } from "../../models/task.model";
import { SessionType } from "../../types/type";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>
  ) {}
  async createTask(body: CreateTaskDto, session: SessionType) {
    let validatedBody: any = {};
    validatedBody = this.removeNulls(body);
    validatedBody.createdBy = session.user._id;
    await this.taskModel.create(validatedBody);
  }
  async updateTask(id: string, body: UpdateTaskDto, session: SessionType) {
    const task = await this.taskModel.findById(id);
    if (task?.createdBy !== session.user._id)
      throw new UnauthorizedException(
        "YOU_ARE_NOT_AUTHORIZE_TO_DO_THIS_ACTION"
      );
    const validatedBody = this.removeNulls(body);
    await this.taskModel.findByIdAndUpdate(id, validatedBody);
  }
  async listTasks(filter: FilterListTasksDto) {
    let queryFilter: any = {};
    queryFilter = this.removeNulls(filter);
    queryFilter.title = filter.title && { $regex: `/${filter.title}/` };
    return this.taskModel.find(queryFilter);
  }
  async listCreatedTasks(session: SessionType) {
    return this.taskModel.find({ createdBy: session.user._id });
  }
  async listAssigneTasks(session: SessionType) {
    return this.taskModel.find({ assigne: session.user._id });
  }
  private removeNulls(payload: any) {
    let result: any = {};
    for (const [key, value] of Object.entries(payload)) {
      if (value) result[key] = value;
    }
    return result;
  }
}
