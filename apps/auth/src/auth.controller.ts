import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.dtos';
import { Auth } from './strategies/auth.decorator';
import { UserRole } from './user-role.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/is-admin')
  @Auth(UserRole.Admin)
  async admin(@Request() req) {
    return req.user;
  }

  @Get('/is-reader')
  @Auth(UserRole.Reader)
  async reader(@Request() req) {
    return req.user;
  }
}
