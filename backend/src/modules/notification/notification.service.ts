import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationService {

  constructor(private prisma: PrismaService) {}

  async create(userId: string, type: string, payload: any) {

    return this.prisma.notification.create({
      data: {
        userId,
        type,
        payload,
      },
    });

  }

}