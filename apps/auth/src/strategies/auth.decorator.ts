import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleDecorator } from './role.decorator';
import { RoleGuard } from './role.guard';
import { UserRole } from '../user-role.enum';
import { JwtAuthGuard } from './jwt.guard';

export function Auth(role?: UserRole) {
  return applyDecorators(
    RoleDecorator(role),
    UseGuards(JwtAuthGuard, RoleGuard),
    ApiBearerAuth(),
  );
}
