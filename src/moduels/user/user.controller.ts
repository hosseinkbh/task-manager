import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Redirect,
  Render,
  Session,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../../gurds/custom.auth.guard";
import { SessionType } from "../../types/type";
import { LoginDto, SingInDto, updatePassDto, UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";
import { CustomThrottlerGuard } from "../../utils/custom-throttler-guard";
import { I18nService } from "nestjs-i18n";
import { render } from "pug";
@Controller("/user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly i18nService: I18nService
  ) {}

  @Get("/view/sign-in")
  @Render("sign-in")
  signInView() {}

  @Get("/view/log-in")
  @Render("log-in")
  logInView() {}

  // @UseGuards(AuthGuard, CustomThrottlerGuard)
  @Redirect("/task/board")
  @Post("/sign-in")
  async signIn(@Session() session: SessionType, @Body() body: SingInDto) {
    await this.userService.signIn(body, session);
  }

  @Redirect("/task/board")
  @Post("/logIn")
  async login(@Session() session: SessionType, @Body() body: LoginDto) {
    return this.userService.login(body, session);
  }
  @Redirect("/")
  @Get("/logOut")
  async logOut(@Session() session: SessionType) {
    return this.userService.logOut(session);
  }
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
