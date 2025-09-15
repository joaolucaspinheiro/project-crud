import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(+id);
  }
}
