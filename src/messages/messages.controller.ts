import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
    return `Returning  id: ${id}`;
  }

  @Post()
  create(@Body('message') body: any) {
    return `message "${body}" created`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { id, ...body };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `message with id ${id} deleted`;
  }
}
