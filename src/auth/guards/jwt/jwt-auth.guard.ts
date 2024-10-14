import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super()
  }

  async canActivate(context: ExecutionContext) {
    const routerPath = context.switchToHttp().getRequest().route.path
    if (routerPath == '/auth' || routerPath === '/user/register') {
      return true
    }

    const canActivate = await super.canActivate(context)

    if (typeof canActivate !== 'boolean') return;

    return canActivate;
  }
}
