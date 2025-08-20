import { Injectable } from '@nestjs/common';
import { log } from 'src/infra/logger';

@Injectable()
export class UsersService {
  list(): { name: string; email: string }[] {
    log.info('Searching users...');
    return [
      { name: 'lucas', email: 'lucas@gmail.com' },
      { name: 'reginaldo', email: 'reginaldo@gmail.com' },
      { name: 'tobias', email: 'tobias@gmail.com' },
    ];
  }
}
