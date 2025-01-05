import {
  ConflictException,
  Injectable,
  NotFoundException,
  Param,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SingInDto, updatePassDto, UpdateUserDto } from "./user.dto";
import bcrypt, { compare } from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { UserModel } from "../../models/user.model";
import { SessionType } from "../../types/type";
import { I18nService } from "nestjs-i18n";
@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
    private readonly configService: ConfigService,
    private readonly i18nService: I18nService
  ) {}

  async signIn(body: SingInDto, session: SessionType) {
    const alreadyRegistered = await this.userModel.findOne({
      $or: [{ email: body.email }, { phoneNumber: body.phoneNumber }],
    });
    if (alreadyRegistered)
      throw new ConflictException(
        "a user with this email or phoneNumber already registerd !!!"
      );
    const encryptedPass = await this.encryptPass(body.password);
    const user = await this.userModel.create({
      password: encryptedPass,
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      phoneNumber: body.phoneNumber,
    });
    session.isLoggedIn = true;
    session.user = {
      id: user.id,
      lastName: user.last_name,
      firstName: user.first_name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }

  async updateUserInfo(body: UpdateUserDto, session: SessionType) {
    const filledBody: any = {};
    filledBody.email = body.email && body.email;
    filledBody.first_name = body.first_name && body.first_name;
    filledBody.last_name = body.last_name && body.last_name;
    filledBody.phoneNumber = body.phoneNumber && body.phoneNumber;
    await this.userModel.updateOne({ _id: session.user.id }, { ...filledBody });
  }

  async updatePass(body: updatePassDto, session: SessionType) {
    const user = await this.userModel.findById(session.user.id);
    if (!user) throw new NotFoundException("USER_NOT_FOUND");
    const isValidated = await compare(body.oldPass, user.password);
    if (!isValidated) throw new UnauthorizedException("INCORRECT_PASSWORD");
    const encryptedPass = this.encryptPass(body.newPass);
    await this.userModel.findOneAndUpdate(
      { _id: session.user.id },
      { password: encryptedPass }
    );
  }

  async getUserByCredintial(identifier: string) {
    const param: any = {};
    identifier.includes("@")
      ? (param.email = identifier)
      : (param.phoneNumber = identifier);
    return this.userModel.findOne({ Param });
  }

  private async encryptPass(pass: string) {
    const saltRound = this.configService.getOrThrow("ENCRYPTION_SALT_ROUND");
    const salt = bcrypt.genSaltSync(+saltRound);
    return bcrypt.hashSync(pass, salt);
  }
}
