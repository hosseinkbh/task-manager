import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { SingInDto, updatePassDto, UpdateUserDto } from './user.dto';
import bcrypt, { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '../../models/user.model';
import { SessionType } from '../../types/type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
    private readonly configService: ConfigService,
  ) {}

  async signIn(body: SingInDto, session: SessionType) {
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

  async updateUserInfo(body: UpdateUserDto, session: SessionType) {
    const updatedValues: UpdateQuery<UserModel> = {};
    body.email && (updatedValues.email = body.email);
    body.firstName && (updatedValues.firstName = body.firstName);
    body.lastName && (updatedValues.lastName = body.lastName);
    body.phoneNumber && (updatedValues.phoneNumber = body.phoneNumber);
    await this.userModel.updateOne({ _id: session.user.id }, updatedValues);
  }

  async updatePass(body: updatePassDto, session: SessionType) {
    const user = await this.userModel.findById(session.user.id);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    const isValidated = await compare(body.oldPass, user.password);
    if (!isValidated) throw new UnauthorizedException('INCORRECT_PASSWORD');
    const encryptedPass = this.encryptPass(body.newPass);
    await this.userModel.findOneAndUpdate(
      { _id: session.user.id },
      { password: encryptedPass },
    );
  }

  async getUserByCredentials(identifier: string) {
    const query: { email?: string; phoneNumber?: string } = {};
    identifier.includes('@')
      ? (query.email = identifier)
      : (query.phoneNumber = identifier);
    return this.userModel.findOne(query);
  }

  private async encryptPass(pass: string) {
    const saltRound = this.configService.getOrThrow('ENCRYPTION_SALT_ROUND');
    const salt = bcrypt.genSaltSync(+saltRound);
    return bcrypt.hashSync(pass, salt);
  }
}
