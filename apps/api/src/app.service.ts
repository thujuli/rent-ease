import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/services/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello() {
    return this.prisma.user.findMany();
  }
}
