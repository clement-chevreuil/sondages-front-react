import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, ValidationPipe, Query, UseGuards, Request } from '@nestjs/common';
import { PollService } from '../../domain/services/poll.service';
import { Poll } from '../../domain/entities/poll.entity';
import { PollOption } from '../../domain/entities/poll_option.entity';
import { CreatePollCommand } from '../../domain/commands/create-poll.command';
import { VotePollCommand } from '../../domain/commands/vote-poll.command';
import { GetPollResponse } from '../../domain/responses/get-poll.response';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { GetAllPollsQuery } from '../../domain/queries/get-all-polls.query';

@Controller('polls')
@UseGuards(JwtAuthGuard)
export class PollController {
  constructor(private readonly pollService: PollService) { }

  @Get()
  async findAll(): Promise<Poll[]> {
    return this.pollService.findAll();
  }

  @Get('all')
  async getAllPolls(@Request() req): Promise<GetPollResponse[]> {
    const userId = req.user.userId;
    const query = new GetAllPollsQuery();
    query.userId = userId;

    return this.pollService.getAllPolls(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<GetPollResponse> {
    return this.pollService.findById(id);
  }

  @Post()
  async create(@Body() createPollCommand: CreatePollCommand, @Request() req): Promise<Poll> {
    createPollCommand.userId = req.user.userId;
    return this.pollService.create(createPollCommand);
  }

  @Post(':id/vote')
  async vote(
    @Param('id') pollId: string,
    @Body() voteCommand: VotePollCommand,
    @Request() req
  ): Promise<any> {
    voteCommand.pollId = pollId;
    if (req.user && req.user.userId) {
      voteCommand.userId = req.user.userId;
    }
    return this.pollService.vote(voteCommand);
  }

  @Get(':id/results')
  async getResults(@Param('id') id: string) {
    return this.pollService.getResults(id);
  }
}
