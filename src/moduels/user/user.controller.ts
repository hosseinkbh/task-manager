import { Body, Controller, Post, Put, Session } from '@nestjs/common';
import { SessionType } from '../../types/type';
import { updatePassDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/update')
  async updateUserInfo(
    @Session() session: SessionType,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateUserInfo(body, session);
  }
  @Post('/update/pass')
  async updatePass(
    @Session() session: SessionType,
    @Body() body: updatePassDto,
  ) {
    return this.userService.updatePass(body, session);
  }
}
