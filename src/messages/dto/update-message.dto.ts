import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  readonly text?: string;
  readonly from?: string;
  readonly to?: string;
}
