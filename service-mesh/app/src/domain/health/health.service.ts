import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth(): string {
    console.log('Checked application health! - V2');
    return 'OK - V2';
  }

  checkReady(): string {
    console.log('Checked application readiness! - V2');
    return 'OK - V2';
  }
}
