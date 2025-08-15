import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'src/domain/users/users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): { name: string; email: string }[] {
    return this.usersService.list();
  }
}
