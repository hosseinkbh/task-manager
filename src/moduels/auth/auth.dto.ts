import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class SingUpDto {
  @IsEmail()
  @IsString()
  @MinLength(10)
  @MaxLength(70)
  email!: string;
  @IsString()
  @MinLength(8)
  password!: string;
  @IsString()
  @MinLength(8)
  confirmPassword!: string;
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstName!: string;
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName!: string;
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber!: string;
}

export class LoginDto {
  @ValidateIf((object, value) => !object.phoneNumber)
  @IsEmail()
  @IsString()
  @MinLength(10)
  @MaxLength(70)
  email?: string;

  @ValidateIf((object, value) => !object.email)
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  phoneNumber?: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
