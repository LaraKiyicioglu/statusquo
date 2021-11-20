import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  private users: Users[] = [];

  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}

  async findOne(username: string): Promise<Users | undefined> {
    return (await this.getUsers()).find((user) => user.username === username);
  }

  private async findUser(id: string): Promise<Users> {
    let user;
    try {
      user = await this.usersModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async getSingleUser(usersId: string) {
    const users = await this.findUser(usersId);
    return {
      id: users.id,
      username: users.username,
      password: users.password,
      firstname: users.firstname,
      surname: users.surname,
      email: users.email,
      role: users.role,
    };
  }

  async insertUsers(
    username: string,
    password: string,
    firstname: string,
    surname: string,
    email: string,
    role: string,
  ) {
    const newUser = new this.usersModel({
      username: username,
      password: password,
      firstname: firstname,
      surname: surname,
      email: email,
      role: role,
    });
    const result = await newUser.save();
    return result.id;
  }

  async getUsers() {
    const users = await this.usersModel.find().exec();
    return users as Users[];
  }

  async updateUsers(
    userId: string,
    username: string,
    password: string,
    firstname: string,
    surname: string,
    email: string,
    role: string,
  ) {
    const updatedUsers = await this.findUser(userId);
    if (username) {
      updatedUsers.username = username;
    }
    if (password) {
      updatedUsers.password = password;
    }
    if (firstname) {
      updatedUsers.firstname = firstname;
    }
    if (surname) {
      updatedUsers.surname = surname;
    }
    if (email) {
      updatedUsers.email = email;
    }
    if (role) {
      updatedUsers.role = role;
    }
    await updatedUsers.save();
  }

  async deleteUsers(usersId: string) {
    const result = await this.usersModel.deleteOne({ _id: usersId }).exec();
    console.log(result);
  }
}
