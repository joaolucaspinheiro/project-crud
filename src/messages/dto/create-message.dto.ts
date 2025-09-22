import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly text: string;

  @IsString()
  @IsNotEmpty()
  readonly from: string;

  @IsString()
  @IsNotEmpty()
  readonly to: string;
}
