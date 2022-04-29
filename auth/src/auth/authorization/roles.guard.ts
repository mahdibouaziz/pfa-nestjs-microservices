import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization.split(' ')[1];

      const user = this.jwtService.decode(token) as any;
      // console.log('DECODED TOKEN: ', user);

      const newUser = {
        ...user,
        roles: [],
      };

      if (newUser.cin) {
        newUser.roles.push(Role.Patient);
      }

      if (newUser.type == 'nurse') {
        newUser.roles.push(Role.Nurse);
      }

      if (newUser.type == 'doctor') {
        newUser.roles.push(Role.Doctor);
      }

      if (newUser.isAdmin == true) {
        newUser.roles.push(Role.Admin);
      }

      console.log('USER:', newUser);

      return requiredRoles.some((role) => newUser.roles?.includes(role));
    } catch (error) {
      //   console.log(error);
      return true;
    }
  }
}
