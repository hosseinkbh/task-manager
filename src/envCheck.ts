import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, validateSync } from "class-validator";

export enum NodeEnvironments {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
  STAGE = "stage",
  TEST = "test",
}

export default class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  PORT!: number;

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
