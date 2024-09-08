import { Body, Controller, Get, Post, Put, Session } from "@nestjs/common";
import { SessionType } from "../types/type";
import { LoginDto, SingInDto, updatePassDto, UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signIn")
  async signIn(@Session() session: SessionType, @Body() body: SingInDto) {
    return this.userService.signIn(body, session);
  }
  @Post("/logIn")
  async login(@Session() session: SessionType, @Body() body: LoginDto) {
    return this.userService.login(body, session);
  }
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
