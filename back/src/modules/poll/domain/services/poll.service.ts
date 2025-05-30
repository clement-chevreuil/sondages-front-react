import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPollRepository } from '../repositories/poll.repository.interface';
import { Poll } from '../entities/poll.entity';
import { PollOption } from '../entities/poll_option.entity';
import { CreatePollCommand } from '../commands/create-poll.command';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { VotePollCommand } from '../commands/vote-poll.command';
import { GetPollResponse } from '../responses/get-poll.response';
import { Vote } from '../entities/vote.entity';
import { UserService } from 'src/modules/user/domain/services/user.service';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { PollResultResponse } from '../responses/poll-result.response';
import { GetAllPollsQuery } from '../queries/get-all-polls.query';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IPollService } from './poll.service.interface';
import { UserNotAdminException } from 'src/modules/user/domain/exceptions/user-not-admin.exception';
import { UserIsAdminException } from 'src/modules/user/domain/exceptions/user-is-admin.exception';
import { PollNotFoundException } from '../exceptions/poll-not-found.exception';
import { OptionNotFoundException } from '../exceptions/option-not-found.exception';
import { UserAlreadyVoteException } from '../exceptions/user-already-vote.exception';

@Injectable()
export class PollService implements IPollService {
  constructor(
    @Inject('IPollRepository')
    private readonly pollRepository: IPollRepository,
    private readonly userService: UserService,
    @InjectMapper() private readonly mapper: Mapper
  ) { }

  // #region get
  async findAll(): Promise<Poll[]> {
    return this.pollRepository.findAll();
  }

  async findById(id: string): Promise<GetPollResponse> {
    const poll = await this.pollRepository.findById(id);

    if (!poll) {
      throw new PollNotFoundException();
    }

    const response = this.mapper.map(poll, Poll, GetPollResponse);
    return response;
  }

  async getAllPolls(query: GetAllPollsQuery): Promise<GetPollResponse[]> {
    const polls = await this.pollRepository.findAll();
    return polls.map(poll => {
      const response = this.mapper.map(poll, Poll, GetPollResponse);
      response.alreadyVoted = poll.votes
        ? poll.votes.some((vote: any) => vote.user && vote.user.id === query.userId)
        : false;
      return response;
    });
  }

  async getResults(pollId: string): Promise<PollResultResponse[]> {
    const poll = await this.pollRepository.findById(pollId);
    if (!poll) {
      throw new PollNotFoundException();
    }
    const votes = await (this.pollRepository as any).pollRepo.manager.find('Vote', {
      where: { poll: { id: pollId } },
      relations: ['options'],
    });
    const counts: Record<string, number> = {};
    poll.options.forEach(opt => { counts[opt.id] = 0; });
    votes.forEach((vote: { options: any[]; }) => {
      if (vote.options) {
        vote.options.forEach(opt => {
          if (counts[opt.id] !== undefined) counts[opt.id]++;
        });
      }
    });
    return poll.options.map(opt => ({ optionId: opt.id, label: opt.label, count: counts[opt.id] } as PollResultResponse));
  }
  // #endregion get


  // #region create
  async create(createPollCommand: CreatePollCommand): Promise<Poll> {
    const errors = await validate(plainToInstance(CreatePollCommand, createPollCommand));
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    const user = await this.userService.findById(createPollCommand.userId);
    if (!user || !user.isAdmin) {
      throw new UserNotAdminException();
    }
    const poll = this.mapper.map(createPollCommand, CreatePollCommand, Poll) as Poll;
    return this.pollRepository.create(poll);
  }

  async vote(command: VotePollCommand): Promise<any> {
    const errors = await validate(plainToInstance(VotePollCommand, command));
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    const checkUser = await this.userService.findById(command.userId);
    if (!checkUser || checkUser.isAdmin) {
      throw new UserIsAdminException();
    }
    const pollExists = await this.pollRepository.existPollId(command.pollId);
    if (!pollExists) {
      throw new PollNotFoundException();
    }
    for (const optionId of command.optionIds) {
      const optionExists = await this.pollRepository.existOptionId(optionId);
      if (!optionExists) {
        throw new OptionNotFoundException();
      }
    }
    const hasVoted = await this.pollRepository.hasUserVotedForPoll(command.pollId, command.userId);
    if (hasVoted) {
      throw new UserAlreadyVoteException();
    }
    const vote = new Vote();
    const poll = new Poll();
    poll.id = command.pollId;
    const pollOption = [...command.optionIds].map(id => {
      const option = new PollOption();
      option.id = id;
      return option;
    });
    const user = new User();
    user.id = command.userId;
    vote.poll = poll;
    vote.user = user;
    vote.options = pollOption;
    return this.pollRepository.addVote(vote);
  }
  // #endregion create
}
