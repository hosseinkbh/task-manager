import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt, { compare } from 'bcrypt';
import { SessionType } from '../../types/type';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../../models/user.model';
import { FilterQuery, Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { LoginDto, SingUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
    private readonly configService: ConfigService,
  ) {}

  async login(payload: LoginDto, session: SessionType): Promise<any> {
    const query: FilterQuery<UserModel> = {};
    payload.email && (query.email = payload.email);
    payload.phoneNumber && (query.phoneNumber = payload.phoneNumber);

    const user = await this.userModel.findOne(query);
    if (!user) {
      throw new UnauthorizedException('invalid (username, email)');
    }
    const isPasswordValid = compare(payload.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    session.isLoggedIn = true;
    session.user = {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }
  async signup(body: SingUpDto, session: SessionType) {
    const alreadyRegistered = await this.userModel.findOne({
      $or: [{ email: body.email }, { phoneNumber: body.phoneNumber }],
    });
    if (alreadyRegistered)
      throw new ConflictException(
        'a user with this email or phoneNumber already registered !!!',
      );
    const encryptedPass = await this.encryptPass(body.password);
    const user = await this.userModel.create({
      password: encryptedPass,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber,
    });
    session.isLoggedIn = true;
    session.user = {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }

  logout(session: SessionType) {
    session.destroy(() => {});
  }

  private async encryptPass(pass: string) {
    const saltRound = this.configService.getOrThrow('ENCRYPTION_SALT_ROUND');
    const salt = bcrypt.genSaltSync(+saltRound);
    return bcrypt.hashSync(pass, salt);
  }
}
