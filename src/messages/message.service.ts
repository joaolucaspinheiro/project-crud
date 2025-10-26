import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PaginationDto } from '../common/dto/pagination.dto';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly usersService: UsersService,
  ) {}
  throwNotFoundException() {
    throw new NotFoundException(`message not found`);
  }
  async findAll(PaginationDto: PaginationDto = {}) {
    const { limit = 10, offset = 0 } = PaginationDto;
    return await this.messageRepository.find({
      take: limit, // Items per page
      skip: offset, // Items to skip
      relations: ['from', 'to'],
      select: {
        from: {
          id: true,
          username: true,
        },
        to: {
          id: true,
          username: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const messageId = parseInt(id, 10);
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
      relations: ['from', 'to'],
      select: {
        from: {
          id: true,
          username: true,
        },
        to: {
          id: true,
          username: true,
        },
      },
    });
    if (message) return message;
    this.throwNotFoundException();
  }
  async create(CreateMessageDto: CreateMessageDto) {
    const { fromId, toId } = CreateMessageDto;
    const fromUser = await this.usersService.findOne(fromId);
    const toUser = await this.usersService.findOne(toId);
    if (!fromUser || !toUser) {
      throw new NotFoundException(`User not found`);
    }

    const newMessage = {
      text: CreateMessageDto.text,
      read: false,
      createdAt: new Date(),
      from: fromUser,
      to: toUser,
    };
    const message = this.messageRepository.create(newMessage);
    return this.messageRepository.save(message);
  }

  async remove(id: string) {
    const messageId = parseInt(id, 10);
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
    });
    if (message) {
      return await this.messageRepository.delete({ id: messageId });
    }
    this.throwNotFoundException();
  }

  async update(id: string, UpdateMessageDto: UpdateMessageDto) {
    const message = await this.findOne(id);
    if (!message) {
      return this.throwNotFoundException();
    } else {
      message.text = UpdateMessageDto.text ?? message.text;
      message.read = UpdateMessageDto.read ?? message.read;
      return this.messageRepository.save(message);
    }
  }
}
