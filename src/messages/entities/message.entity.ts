import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  text: string;
  @Column({ type: 'varchar' })
  from: string;
  @Column({ type: 'varchar' })
  to: string;
  @Column({ default: false })
  read: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
