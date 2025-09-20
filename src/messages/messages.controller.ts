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
  create(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.messageService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.messageService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
