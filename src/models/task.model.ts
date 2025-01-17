import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { UserModel } from './user.model';
import { TagModel } from './tag.model';

export enum PriorityType {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  ARCHIVE = 'ARCHIVE',
  DELETED = 'DELETED',
}

@Schema({ collection: 'TaskModel', timestamps: true, versionKey: false })
export class TaskModel {
  @Prop({ type: String, unique: true })
  taskId!: string;
  @Prop({ type: String, minlength: 1, maxlength: 100, required: true })
  title!: string;
  @Prop({ type: String, minlength: 0, maxlength: 5000 })
  description?: string | undefined;
  @Prop({ type: String, ref: 'UserModel', required: true })
  createdBy!: Types.ObjectId | UserModel;
  @Prop({ type: String, ref: 'UserModel', required: false, default: undefined })
  assign?: Types.ObjectId | UserModel | undefined;
  @Prop({
    type: String,
    enum: PriorityType,
    required: false,
    default: PriorityType.MEDIUM,
  })
  priority?: PriorityType;
  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.TODO })
  status?: TaskStatus;
  @Prop({ type: String, ref: 'TagModel', required: false, default: undefined })
  tag?: Types.ObjectId | TagModel | undefined;
  
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
export type TaskDocument = HydratedDocument<TaskModel>;
TaskSchema.plugin(paginate);
export const TaskModelDefinition: ModelDefinition = {
  name: TaskModel.name,
  schema: TaskSchema,
};
