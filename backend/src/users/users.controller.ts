import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUsers(
    @Body('username') usersUsername: string,
    @Body('password') usersPassword: string,
    @Body('firstname') usersFirstname: string,
    @Body('surname') usersSurname: string,
    @Body('email') usersEmail: string,
    @Body('role') usersRole: string,
  ) {
    const generatedId = await this.usersService.insertUsers(
      usersUsername,
      usersPassword,
      usersFirstname,
      usersSurname,
      usersEmail,
      usersRole,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUsers(@Param('id') usersId: string) {
    return this.usersService.getSingleUser(usersId);
  }

  @Patch(':id')
  async updateUsers(
    @Param('id') usersId: string,
    @Body('username') usersUsername: string,
    @Body('password') usersPassword: string,
    @Body('firstname') usersFirstname: string,
    @Body('surname') usersSurname: string,
    @Body('email') usersEmail: string,
    @Body('role') usersRole: string,
  ) {
    await this.usersService.updateUsers(
      usersId,
      usersUsername,
      usersPassword,
      usersFirstname,
      usersSurname,
      usersEmail,
      usersRole,
    );
    return null;
  }

  @Delete(':id')
  async removeUsers(@Param('id') usersId: string) {
    await this.usersService.deleteUsers(usersId);
    return null;
  }
}
