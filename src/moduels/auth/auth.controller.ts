import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { SessionType } from '../../types/type';
import { LoginDto, SingUpDto } from './auth.dto';
import { SessionAuthGuard } from '../../guards/sessionAuth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/view/log-in')
  @Render('log-in')
  logInView() {}

  @Redirect('/task/board')
  @Post('/login')
  async login(@Body() payload: LoginDto, @Session() session: SessionType) {
    await this.authService.login(payload, session);
  }

  @Get('/view/sign-up')
  @Render('sign-up')
  signupView() {}

  @Redirect('/task/board')
  @Post('/sign-up')
  async signup(@Body() body: SingUpDto, @Session() session: SessionType) {
    return this.authService.signup(body, session);
  }

  @Redirect('/')
  @UseGuards(SessionAuthGuard)
  @Get('logout')
  logout(@Session() session: SessionType): any {
    this.authService.logout(session);
  }

  @Post('/status')
  status(@Req() req: Request): any {
    if (req.user) {
      return { loggedIn: true, user: req.user };
    }
    return { loggedIn: false };
  }
}
