import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../../models/user.model';

@Module({
  imports: [MongooseModule.forFeature([UserModelDefinition])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
