//auth.module.ts
import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../strategy/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "10d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
