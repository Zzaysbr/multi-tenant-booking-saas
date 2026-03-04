import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    const tenantId = request.params.tenantId;

    if (!user) return false;

    return true;
  }

}