import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { PriorityEnum, StatuEnum } from "../models/task.model";

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
  @IsMongoId()
  @IsOptional()
  assigne?: string | null;
  @IsString()
  @IsOptional()
  @IsEnum(PriorityEnum)
  priority?: PriorityEnum;
  @IsString()
  @IsOptional()
  @IsEnum(StatuEnum)
  status?: StatuEnum;
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
  assigne?: string | null;
  @IsString()
  @IsOptional()
  @IsEnum(PriorityEnum)
  priority?: PriorityEnum;
  @IsString()
  @IsOptional()
  @IsEnum(StatuEnum)
  status?: StatuEnum;
}
export class FilterListTasksDto {
  @IsString()
  @MaxLength(100)
  title?: string;
  @IsString()
  @IsMongoId()
  @IsOptional()
  assigne?: string | null;
  @IsString()
  @IsMongoId()
  @IsOptional()
  createdBy?: string | null;
  @IsString()
  @IsOptional()
  @IsEnum(PriorityEnum)
  priority?: PriorityEnum;
  @IsString()
  @IsOptional()
  @IsEnum(StatuEnum)
  status?: StatuEnum;
}

export class MongoIdDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  id!: string;
}
