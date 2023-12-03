import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roleKey } from './role.decorator';
import { UserRole, UserRolePrivileges } from '../user-role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('role guard');

    return new Promise(async (resolve, reject) => {
      const requiredRole = this.reflector.getAllAndOverride<UserRole>(roleKey, [
        context.getHandler(),
        context.getClass(),
      ]);

      console.log(requiredRole);

      if (!requiredRole) resolve(true);

      const role = context.switchToHttp().getRequest().user?.role;

      if (UserRolePrivileges[role] < UserRolePrivileges[requiredRole])
        return reject(
          new ForbiddenException(
            `This action requires you to have the "${requiredRole}" role`,
          ),
        );

      resolve(true);
    });
  }
}
