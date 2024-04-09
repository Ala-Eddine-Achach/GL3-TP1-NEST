import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { UserRoleEnum } from '../../enum/roles.enum';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user && user.role === UserRoleEnum.ADMIN;
  }
}
