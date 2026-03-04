import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { contains } from 'class-validator';

@Injectable()
export class TenantService {
    constructor(private prisma: PrismaService) {}

    async create(ownerId: string, name: string, timezone: string) {
        return this.prisma.tenant.create({
            data: {
                name,
                timezone,
                ownerId,
            },
        });
    }

    async findMine(userId: string, search?: string) {
        return this.prisma.tenant.findMany({
            where: {
                ownerId: userId,
                deletedAt: null,
                name: search
                    ? { contains: search, mode: 'insensitive' }
                    : undefined,
            },
        });
    }

    async findAll(){
        return this.prisma.tenant.findMany({
            where: {
                deletedAt: null,
            },
        });
    }


    async softDelete(id: string, ownerId: string){
        return this.prisma.tenant.update({
            where: {
                id,
                ownerId,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }

}
