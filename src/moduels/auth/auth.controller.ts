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
import { AuthGuard } from '@nestjs/passport';
import { SingInDto } from '../user/user.dto';
import { SessionType } from '../../types/type';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/view/log-in')
  @Render('log-in')
  logInView() {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request) {
    return req.user;
  }

  @Get('/view/sign-in')
  @Render('sign-in')
  signInView() {}

  @Redirect('/')
  @Post('/sign-in')
  async signIn(@Body() body: SingInDto, @Session() session: SessionType) {
    return this.authService.signIn(body, session);
  }

  @Redirect('/')
  @Post('logout')
  logout(@Req() req: Request): any {
    req.session.destroy(() => {});
    return;
  }

  @Post('/status')
  status(@Req() req: Request): any {
    if (req.user) {
      return { loggedIn: true, user: req.user };
    }
    return { loggedIn: false };
  }
}
