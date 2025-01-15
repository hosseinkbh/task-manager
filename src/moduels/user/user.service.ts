import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { updatePassDto, UpdateUserDto } from './user.dto';
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

  private async encryptPass(pass: string) {
    const saltRound = this.configService.getOrThrow('ENCRYPTION_SALT_ROUND');
    const salt = bcrypt.genSaltSync(+saltRound);
    return bcrypt.hashSync(pass, salt);
  }
}
