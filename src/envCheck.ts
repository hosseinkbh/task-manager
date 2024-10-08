import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, validateSync } from "class-validator";

export enum NodeEnvironments {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
  TEST = "test",
}

export default class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  NODE_ENV!: NodeEnvironments;
  @IsNotEmpty()
  @IsNumber()
  PORT!: number;
  @IsNotEmpty()
  @IsString()
  MONGODB_URI!: string;
  @IsNotEmpty()
  @IsNumber()
  ENCRYPTION_SALT_ROUND!: number;
  @IsNotEmpty()
  @IsString()
  REDIS_HOST!: string;
  @IsNotEmpty()
  @IsNumber()
  REDIS_PORT!: number;
  @IsNotEmpty()
  @IsNumber()
  THROTTLER_REDIS_DB!: number;
  static validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }
}
