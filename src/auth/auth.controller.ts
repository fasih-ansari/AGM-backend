import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Successfully logged in' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('signup')
    @ApiOperation({ summary: 'User signup' })
    @ApiResponse({ status: 201, description: 'Successfully signed up' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async signup(@Body() signupDto: { email: string; password: string }) {
        return this.authService.signup(signupDto.email, signupDto.password);
    }
}
