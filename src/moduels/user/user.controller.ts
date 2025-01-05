import { Body, Controller, Post, Put, Redirect, Session } from "@nestjs/common";
import { SessionType } from "../../types/type";
import { SingInDto, updatePassDto, UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";
import { I18nService } from "nestjs-i18n";

@Controller("/user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly i18nService: I18nService
  ) {}

  @Put("/update")
  async updateUserInfo(
    @Session() session: SessionType,
    @Body() body: UpdateUserDto
  ) {
    return this.userService.updateUserInfo(body, session);
  }
  @Post("/update/pass")
  async updatePass(
    @Session() session: SessionType,
    @Body() body: updatePassDto
  ) {
    return this.userService.updatePass(body, session);
  }
}
