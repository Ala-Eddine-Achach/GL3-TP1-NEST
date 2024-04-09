import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: RegisterUserDto) {
    const user: User = this.usersRepository.create({ ...createUserDto });
    //just return username and email
    try {
      await this.usersRepository.save(user);
      return { username: user.username, email: user.email };
    } catch (e) {
      return e.message;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: LoginUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
