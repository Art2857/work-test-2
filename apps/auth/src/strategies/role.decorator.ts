import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user-role.enum';

export const roleKey = 'role-key';
export const RoleDecorator = (role?: UserRole) => SetMetadata(roleKey, role);
