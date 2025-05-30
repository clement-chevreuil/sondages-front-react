import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Poll } from './poll.entity';
import { AutoMap } from '@automapper/classes';

@Entity('poll_options')
export class PollOption {

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: false })
  label: string;

  @AutoMap()
  @ManyToOne(() => Poll, (poll) => poll.options, { onDelete: 'CASCADE' })
  poll: Poll;
}
