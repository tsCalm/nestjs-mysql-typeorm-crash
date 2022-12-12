import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/createUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/createUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/updateUser.dto';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  /**
   * service의 함수의 리턴값을 사용하여 어떠한 로직을 처리하지 않는다면 async await를 붙이지 않아도 괜찮다. nestJs에서 자동으로 처리해준다.
   * @returns User
   */
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfiles(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  createUserpost(
    @Param('id', ParseIntPipe) id: number,
    @Body() CreateUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(id, CreateUserPostDto);
  }
}
