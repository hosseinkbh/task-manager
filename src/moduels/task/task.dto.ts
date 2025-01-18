import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { PriorityType, TaskStatus } from '../../models/task.model';

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;
  @IsString()
  @MinLength(0)
  @IsOptional()
  @MaxLength(5000)
  description?: string;
  @IsString()
  @ValidateIf((o, value) => value == null)
  @IsOptional()
  @IsMongoId()
  assign?: string | null;
  @IsString()
  @IsOptional()
  @IsEnum(PriorityType)
  priority?: PriorityType;
}
export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  title?: string;
  @IsString()
  @MinLength(0)
  @IsOptional()
  @MaxLength(5000)
  description?: string;
  @IsString()
  @IsMongoId()
  @IsOptional()
  assign?: string | null;
  @IsString()
  @IsOptional()
  @IsEnum(PriorityType)
  priority?: PriorityType;
  @IsString()
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
export class FilterListTasksDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  title?: string;
  @IsString()
  @IsMongoId()
  @IsOptional()
  assign?: string | null;
  @IsString()
  @IsMongoId()
  @IsOptional()
  createdBy?: string | null;
  @IsString()
  @IsOptional()
  @IsEnum(PriorityType)
  priority?: PriorityType;
  @IsString()
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

export class MongoIdDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  id!: string;
}
