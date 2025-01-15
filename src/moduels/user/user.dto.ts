import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsString()
  @MinLength(10)
  @MaxLength(70)
  @IsOptional()
  email!: string;
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  firstName!: string;
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  lastName!: string;
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @IsOptional()
  phoneNumber!: string;
}

export class updatePassDto {
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  oldPass!: string;
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  newPass!: string;
}
