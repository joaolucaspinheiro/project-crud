import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { message } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([message])],
  controllers: [MessagesController],
  providers: [MessageService],
})
export class MessagesModule {}
