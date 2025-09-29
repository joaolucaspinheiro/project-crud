import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  throwNotFoundException() {
    throw new NotFoundException(`message not found`);
  }
  findAll() {
    return this.messageRepository.find();
  }

  async findOne(id: string) {
    const messageId = parseInt(id, 10);
    const message = await this.messageRepository.find({
      where: { id: messageId },
    });
    if (message) return message;
    this.throwNotFoundException();
  }
  create(CreateMessageDto: CreateMessageDto) {
    const newMessage = {
      ...CreateMessageDto,
      read: false,
      createdAt: new Date(),
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
    const messageId = parseInt(id, 10);
    const message = await this.messageRepository.preload({
      id: messageId,
      ...UpdateMessageDto,
    });
    if (!message) {
      throw new NotFoundException(`Message with ID #${id} not found`);
    }
    return this.messageRepository.save(message);
  }
}
