import { Injectable, NotFoundException } from '@nestjs/common';
import { messageEntity } from './entities/message.entity';

@Injectable()
export class MessageService {
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
  findAll() {
    return this.message;
  }
  throwNotFoundException() {
    throw new NotFoundException(`message not found`);
  }
  findOne(id: string) {
    const message = this.message.find((item) => item.id === +id);
    if (message) return message;
    this.throwNotFoundException();
  }
  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newMessage = { id, ...body };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.message.push(newMessage);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
  update(id: string, body: any) {
    const messageExistIndex = this.message.findIndex((item) => item.id === +id);
    if (messageExistIndex >= 0) {
      const oldMessage = this.message[messageExistIndex];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const updated = { ...oldMessage, ...body };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.message[messageExistIndex] = updated;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return updated;
    }
    this.throwNotFoundException();
  }
}
