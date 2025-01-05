import { PassportStrategy } from "@nestjs/passport";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string | undefined, password: string): Promise<any> {
    if (!username) {
      throw new BadRequestException("INVALID CREDINCIAL");
    } else {
      const authResult = await this.authService.validateUser(
        username,
        password
      );
      if (!authResult) {
        throw new UnauthorizedException("Invalid credentials");
      }
      return authResult;
    }
  }
}
