import { Injectable, NotFoundException } from '@nestjs/common';
import { message, messageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(message)
    private readonly messageRepository: Repository<message>,
  ) {}
  private lastId = 1;
  private message: messageEntity[] = [
    {
      id: 1,
      text: 'Hello World',
      from: 'User1',
      to: 'User2',
      read: false,
      createdAt: new Date(),
    },
  ];
  throwNotFoundException() {
    throw new NotFoundException(`message not found`);
  }
  findAll() {
    return this.messageRepository.find();
  }

  async findOne(id: string) {
    const message = await this.messageRepository.find({ where: { id } });
    if (message) return message;
    this.throwNotFoundException();
  }
  create(CreateMessageDto: CreateMessageDto) {
    this.lastId++;
    const id = this.lastId;

    const newMessage = {
      id,
      ...CreateMessageDto,
      read: false,
      createdAt: new Date(),
    };
    this.message.push(newMessage);
    return newMessage;
  }

  remove(id: string) {
    const messageExistIndex = this.message.findIndex((item) => item.id === +id);
    if (messageExistIndex >= 0) {
      const deleted = this.message[messageExistIndex];
      this.message.splice(messageExistIndex, 1);
      return deleted;
    }
    this.throwNotFoundException();
  }
  update(id: string, UpdateMessageDto: UpdateMessageDto) {
    const messageExistIndex = this.message.findIndex((item) => item.id === +id);
    if (messageExistIndex >= 0) {
      const oldMessage = this.message[messageExistIndex];
      const updated = { ...oldMessage, ...UpdateMessageDto };
      this.message[messageExistIndex] = updated;
      return updated;
    }
    this.throwNotFoundException();
  }
}
