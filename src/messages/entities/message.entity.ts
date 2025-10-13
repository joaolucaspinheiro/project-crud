import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  text: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'from' })
  from: User;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'to' })
  to: User;
  @Column({ default: false })
  read: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
