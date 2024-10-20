import { Global, Module } from '@nestjs/common';
import { PrismaService } from '~/common/services/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
export class CommonModule {}
