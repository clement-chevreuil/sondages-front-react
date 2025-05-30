import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { PollOption } from './poll_option.entity';
import { AutoMap } from '@automapper/classes';
import { Vote } from './vote.entity';

@Entity('polls')
export class Poll {


  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  description?: string;

  @AutoMap()
  @Column({ type: 'boolean', default: true })
  singleChoice: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @AutoMap()
  @OneToMany(() => PollOption, (option) => option.poll, { cascade: true })
  options: PollOption[];

  @OneToMany(() => Vote, (vote) => vote.poll, { cascade: true })
  votes: Vote[];
}
