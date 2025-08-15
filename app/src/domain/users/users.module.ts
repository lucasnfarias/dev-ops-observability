import { Module } from '@nestjs/common';
import { UsersController } from 'src/domain/users/users.controller';
import { UsersService } from 'src/domain/users/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
