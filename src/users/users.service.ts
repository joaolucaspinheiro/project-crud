import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userData = {
        username: createUserDto.username,
        email: createUserDto.email,
        passwordHash: createUserDto.password,
      };
      const newUser = this.usersRepository.create(userData);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) return user;
    throw new NotFoundException('User not found');
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userFields = {
      name: updateUserDto.username,
      passwordHash: updateUserDto.password,
    };
    const user = await this.usersRepository.preload({
      id: id,
      ...userFields,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return {
      message: `User has been deleted.`,
      id: id,
    };
  }
}
