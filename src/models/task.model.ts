import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, HydratedDocument } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { UserModel } from "./user.model";

export enum PriorityEnum {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}
export enum StatuEnum {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
  ARCHIVE = "archive",
  DELETED = "DELETED",
}

@Schema({ collection: "TaskModel", timestamps: true, versionKey: false })
export class TaskModel {
  @Prop({ type: String, minlength: 1, maxlength: 100, required: true })
  title!: string;
  @Prop({ type: String, minlength: 0, maxlength: 5000 })
  description?: string | null;
  @Prop({ type: String, ref: "UserModel", required: true })
  createdBy!: Types.ObjectId | UserModel;
  @Prop({ type: String, ref: "UserModel", required: false, default: null })
  assigne?: Types.ObjectId | UserModel | null;
  @Prop({
    type: String,
    enum: PriorityEnum,
    required: false,
    default: PriorityEnum.MEDIUM,
  })
  priority?: PriorityEnum;
  @Prop({ type: String, enum: StatuEnum, default: StatuEnum.TODO })
  status?: StatuEnum;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
export type TaskDocument = HydratedDocument<TaskModel>;
TaskSchema.plugin(paginate);
export const TaskModelDefinition: ModelDefinition = {
  name: TaskModel.name,
  schema: TaskSchema,
};
