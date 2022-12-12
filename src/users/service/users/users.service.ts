import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities/user';
import { Repository } from 'typeorm';
import {
  CreateUserparams,
  CreateUserPostParams,
  CreateUserProfileParams,
  UpdateUserparams,
} from 'src/utils/types';
import { Profile } from 'src/typeorm/entities/profile';
import { Posts } from 'src/typeorm/entities/post';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Posts) private postRepo: Repository<Posts>,
  ) {}

  findUsers() {
    return this.userRepo.find({ relations: ['profile', 'posts'] });
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

  async createUserProfile(
    id: number,
    userProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found, Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepo.create(userProfileDetails);
    const savedProfile = await this.profileRepo.save(newProfile);
    user.profile = savedProfile;
    return this.userRepo.save(user);
  }

  async createUserPost(id, createUserPostDetails: CreateUserPostParams) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found, Cannot create Post',
        HttpStatus.BAD_REQUEST,
      );

    const newPost = this.postRepo.create({ ...createUserPostDetails, user });
    return await this.postRepo.save(newPost);
  }
}
