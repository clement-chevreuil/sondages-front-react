import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poll } from '../../domain/entities/poll.entity';
import { PollOption } from '../../domain/entities/poll_option.entity';
import { IPollRepository } from '../../domain/repositories/poll.repository.interface';
import { Vote } from '../../domain/entities/vote.entity';

@Injectable()
export class PollRepositoryImpl implements IPollRepository {
  // #region constructor
  constructor(
    @InjectRepository(Poll)
    private readonly pollRepo: Repository<Poll>,
    @InjectRepository(PollOption)
    private readonly optionRepo: Repository<PollOption>,
  ) { }
  // #endregion

  // #region get
  async findAll(): Promise<Poll[]> {
    return this.pollRepo.find({ relations: ['options', 'votes'] });
  }

  async findById(id: string): Promise<Poll | null> {
    return this.pollRepo.findOne({ where: { id }, relations: ['options', 'votes'] });
  }

  async findPollOptionById(id: string): Promise<PollOption | null> {
    return this.optionRepo.findOne({ where: { id } });
  }

  // #endregion

  // #region create
  async create(poll: Partial<Poll>): Promise<Poll> {
    return this.pollRepo.save(this.pollRepo.create(poll));
  }

  async addVote(vote: Partial<Vote>): Promise<Vote> {
    const newVote = this.pollRepo.manager.create(Vote, vote);
    return this.pollRepo.manager.save(newVote);
  }
  // #endregion

  // #region check
  async existPollId(id: string): Promise<boolean> {
    const count = await this.pollRepo.count({ where: { id } });
    return count > 0;
  }

  async existOptionId(id: string): Promise<boolean> {
    const count = await this.optionRepo.count({ where: { id } });
    return count > 0;
  }

  async hasUserVotedForPoll(pollId: string, userId: string): Promise<boolean> {
    const count = await this.pollRepo.manager.count(Vote, {
      where: { poll: { id: pollId }, user: { id: userId } },
      relations: ['poll', 'user'],
    });
    return count > 0;
  }
  // #endregion
}
