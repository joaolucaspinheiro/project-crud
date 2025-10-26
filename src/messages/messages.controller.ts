import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

class UpdateMessageDto {}

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessageService) {}
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.messageService.findAll(paginationDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Post() create(@Body() createMessageDto: CreateMessageDto) {
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
