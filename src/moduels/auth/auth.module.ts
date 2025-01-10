import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'session' }),
    UserModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
