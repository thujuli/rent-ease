import { Module } from '@nestjs/common';
import { CommonModule } from '~/common/common.module';
import { AuthModule } from '~/auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
