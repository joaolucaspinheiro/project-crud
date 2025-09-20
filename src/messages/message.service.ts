import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  hello() {
    return 'Hello World';
  }
}
