import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/domain/users/users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getHello(): Promise<any> {
    return this.usersService.list();
  }
}
