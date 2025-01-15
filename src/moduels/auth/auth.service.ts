import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { SingInDto } from '../user/user.dto';
import { SessionType } from '../../types/type';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(identifier: string, password: string): Promise<any> {
    const user = await this.userService.getUserByCredentials(identifier);
    if (!user) {
      return false;
    }
    const isPasswordValid = compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }
  async signIn(body: SingInDto, session: SessionType) {
    return this.userService.signIn(body, session);
  }
}
