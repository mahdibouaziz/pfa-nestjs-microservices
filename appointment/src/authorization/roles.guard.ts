import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const payload = request.body.payload;
    // console.log(payload);

    const newUser = {
      roles: [],
    };

    if (payload.cin) {
      newUser.roles.push(Role.Patient);
    }

    if (payload.type == 'nurse') {
      newUser.roles.push(Role.Nurse);
      newUser.roles.push(Role.Patient);
    }

    if (payload.type == 'doctor') {
      newUser.roles.push(Role.Nurse);
      newUser.roles.push(Role.Doctor);
      newUser.roles.push(Role.Patient);
    }

    if (payload.isAdmin == true) {
      newUser.roles.push(Role.Admin);
      newUser.roles.push(Role.Doctor);
      newUser.roles.push(Role.Nurse);
      newUser.roles.push(Role.Patient);
    }

    console.log(newUser);

    const result = requiredRoles.some((role) => newUser.roles?.includes(role));

    if (result == false) {
      throw new UnauthorizedException(
        'You do not have the appropriate Role to do this operation',
      );
    }
    return true;
  }
}
