import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client'; // Import PrismaClientKnownRequestError

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = this.getStatus(exception);

        response.status(status).json({
            statusCode: status,
            message: exception.message || 'Internal server error',
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
        });
    }

    private getStatus(exception: any): number {
        if (exception instanceof PrismaClientKnownRequestError) {
            return HttpStatus.BAD_REQUEST; // Handle Prisma client known request errors
        }

        return HttpStatus.INTERNAL_SERVER_ERROR; // Default to 500 status code for other errors
    }
}
