import { DynamicModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@shared/database';
import { UserProvider } from './entities/user.provider';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './strategies/jwt.guard';
import { RoleGuard } from './strategies/role.guard';

@Module({})
export class AuthModule {
  static forRoot(onlyLogic: boolean = false): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        DatabaseModule,
        PassportModule,
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '15m' },
        }),
      ],
      controllers: onlyLogic ? [] : [AuthController],
      providers: [
        AuthService,
        UserProvider,
        LocalStrategy,
        JwtStrategy,
        JwtAuthGuard,
        RoleGuard,
      ],
      exports: [
        AuthService,
        UserProvider,
        LocalStrategy,
        JwtStrategy,
        JwtAuthGuard,
        RoleGuard,
      ],
    };
  }
}
