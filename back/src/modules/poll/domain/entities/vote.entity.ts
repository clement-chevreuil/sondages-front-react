import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Unique, ManyToMany, JoinTable } from 'typeorm';
import { Poll } from './poll.entity';
import { PollOption } from './poll_option.entity';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { AutoMap } from '@automapper/classes';

@Entity('votes')
@Unique(['user', 'poll'])
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  user: User;

  @AutoMap()
  @ManyToOne(() => Poll, { eager: true, onDelete: 'CASCADE' })
  poll: Poll;

  @AutoMap()
  @ManyToMany(() => PollOption, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  options: PollOption[];

  @CreateDateColumn()
  createdAt: Date;
}
