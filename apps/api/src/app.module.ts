import { Module } from '@nestjs/common';
import { CommonModule } from '~/common/common.module';

@Module({
  imports: [CommonModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
