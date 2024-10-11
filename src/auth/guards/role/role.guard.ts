import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLE_KEY } from 'src/shared/decorators/role.decorator';
import { UnauthorizedException } from 'src/shared/exceptions/unathorized.exception';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflactor: Reflector) { }

    async canActivate(context: ExecutionContext) {
        const routerRole = this.reflactor.getAllAndOverride(
            ROLE_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!routerRole) return true

        const request = context.switchToHttp().getRequest()
        const user = request.user
        const userRole: Role = user.type

        if (!this.isPermissionValid(userRole, routerRole)) {
            throw new UnauthorizedException("You don't have permission")
        } else {
            return true
        }
    }

    isPermissionValid(userRole: Role, routerRole: Role) {
        if (userRole == Role.ADMIN || userRole == Role.MASTER) {
            return true
        }

        if (userRole === routerRole) {
            return true
        }

        return false
    }
}
