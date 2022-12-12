import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/typeorm/entities/post';
import { Profile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/user';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './service/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Posts])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
