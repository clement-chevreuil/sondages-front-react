import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// Domain Entity: User
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column({ default: false })
  isAdmin: boolean;
}
