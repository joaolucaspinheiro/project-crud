import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

class UpdateMessageDto {}

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}
  @Get()
  findAll() {
    return this.messageService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, UpdateMessageDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
