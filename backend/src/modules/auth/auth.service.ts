import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { access } from 'fs';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {} // inject prisma service




    // register service
    async register(email: string, password: string, role: 'customer' | 'owner'){
        const existing = await this.prisma.user.findUnique({ where: { email } });

        if (existing) {
            throw new BadRequestException('Email already in use');
        }

        const hash = await bcrypt.hash(password, 12);

        const user = await this.prisma.user.create({
            data: {
                email,
                passwordHash: hash,
                role,
            },
        });

        return { 
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }


    // login service
    async login(email: string, password: string){

        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new UnauthorizedException();
        }

        const match = await bcrypt.compare(password, user.passwordHash);

        if (!match) {
            throw new UnauthorizedException();
        }

        // generate JWT
        const token = jwt.sign(
            { sub: user.id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' },
        );

        return { accessToken: token };
    }
}
