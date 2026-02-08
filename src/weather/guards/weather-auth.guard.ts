import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class WeatherAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const authHeader: string | string[] | undefined =
      request.headers['x-auth-weather'];

    if (authHeader !== 'JOECOOL123') {
      throw new UnauthorizedException();
    }

    return true;
  }
}
