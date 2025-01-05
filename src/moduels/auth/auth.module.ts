import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./localStrategy";
import { UserModule } from "../user/user.module";
import { SessionSerializer } from "./session.serializer";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "session" }),

    UserModule,
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
