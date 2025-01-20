import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @MaxLength(100)
  @MinLength(1)
  @IsString()
  name!: string;
}

export class listBoardQueryDto {
  @IsString()
  @IsOptional()
  owner?: string;

  @IsString()
  @IsOptional()
  members?: string;
}
