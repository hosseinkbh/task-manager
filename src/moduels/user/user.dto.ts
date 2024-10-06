import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsString()
  @MinLength(10)
  @MaxLength(70)
  email!: string;
  @IsString()
  @MinLength(8)
  pass!: string;
}

export class SingInDto {
  @IsEmail()
  @IsString()
  @MinLength(10)
  @MaxLength(70)
  email!: string;
  @IsString()
  @MinLength(8)
  password!: string;
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  first_name!: string;
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  last_name!: string;
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber!: string;
}
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
  first_name!: string;
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  last_name!: string;
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
