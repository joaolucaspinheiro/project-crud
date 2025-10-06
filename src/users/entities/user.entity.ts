import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column()
  passwordHash: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt?: Date;
}
