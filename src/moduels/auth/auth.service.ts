import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { compare, compareSync } from "bcrypt";
import { SingInDto } from "../user/user.dto";
import { SessionType } from "../../types/type";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(identifier: string, password: string): Promise<any> {
    const user = await this.userService.getUserByCredintial(identifier);
    if (!user) {
      return false;
    }
    const isPasswordValid = compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException("Invalid password");
    }

    return {
      id: user.id,
      lastName: user.last_name,
      firstName: user.first_name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }
  async signIn(body: SingInDto, session: SessionType) {
    return this.userService.signIn(body, session);
  }
}
