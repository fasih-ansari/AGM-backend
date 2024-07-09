import { Controller, Post, Body, HttpStatus, HttpCode, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('signup')
    @ApiOperation({ summary: 'User signup' })
    @ApiResponse({ status: 201, description: 'Successfully signed up.' })
    @ApiBadRequestResponse({ description: 'Email already exists.' })
    async signup(@Body() signupDto: { email: string; password: string }) {
        const { email, password } = signupDto;
        const existingUser = await this.userService.findUserByEmail(email);
        if (existingUser) {
            throw new BadRequestException('Email already exists.');
        }
        return this.userService.createUser(email, password);
    }
}
