import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth(): string {
    console.log('Checked application health!');
    return 'OK';
  }

  checkReady(): string {
    console.log('Checked application readiness!');
    return 'OK';
  }
}
