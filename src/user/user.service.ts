import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUser(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: { email, password: hashedPassword },
        });
    }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.findUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
