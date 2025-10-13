import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule],
  controllers: [MessagesController],
  providers: [MessageService],
})
export class MessagesModule {}
