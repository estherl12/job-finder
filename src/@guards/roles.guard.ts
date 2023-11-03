import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role_Key } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {

    const requiredRole = this.reflector.getAllAndOverride<Role[]>(Role_Key, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }
    console.log(requiredRole);
    
    const { user } = context.switchToHttp().getRequest();
    
    console.log(user)
    return requiredRole.some((role) => user.role?.includes(role));
  }
}
