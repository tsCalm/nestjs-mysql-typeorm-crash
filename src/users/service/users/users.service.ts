import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities/user';
import { Repository } from 'typeorm';
import { CreateUserparams, UpdateUserparams } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findUsers() {
    return this.userRepo.find();
  }

  createUser(userDetails: CreateUserparams) {
    const newUser = this.userRepo.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepo.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserparams) {
    return this.userRepo.update({ id }, updateUserDetails);
  }
  deleteUser(id: number) {
    return this.userRepo.delete({ id });
  }
}
