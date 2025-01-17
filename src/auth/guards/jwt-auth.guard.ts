import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // You can throw an error based on your custom requirements
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
