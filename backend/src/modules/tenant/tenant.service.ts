import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

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

    async findMine(ownerId: string) {
        return this.prisma.tenant.findMany({
            where: {
                ownerId,
                deletedAt: null,
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
