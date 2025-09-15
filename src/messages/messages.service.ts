import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  findAll() {
    return 'All messages';
  }
  findOne(id: number) {
    return `message ${id}`;
  }
}
