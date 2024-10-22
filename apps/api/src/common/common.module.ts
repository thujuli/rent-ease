import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '~/common/services/prisma.service';
import { validate } from '~/env.validation';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [ConfigModule.forRoot({ isGlobal: true, validate })],
})
export class CommonModule {}
