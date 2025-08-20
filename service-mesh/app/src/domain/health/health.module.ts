import { Module } from '@nestjs/common';
import { HealthController } from 'src/domain/health/health.controller';
import { HealthService } from 'src/domain/health/health.service';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
