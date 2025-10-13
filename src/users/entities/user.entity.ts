import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Message } from '../../messages/entities/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column()
  passwordHash: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Message, (message) => message.from)
  sentMessages: Message[];
  @OneToMany(() => Message, (message) => message.to)
  receivedMessages: Message[];
}
