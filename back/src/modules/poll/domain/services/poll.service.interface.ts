import { Poll } from '../entities/poll.entity';
import { GetPollResponse } from '../responses/get-poll.response';
import { CreatePollCommand } from '../commands/create-poll.command';
import { VotePollCommand } from '../commands/vote-poll.command';
import { PollResultResponse } from '../responses/poll-result.response';
import { GetAllPollsQuery } from '../queries/get-all-polls.query';

/**
 * Interface for poll service.
 * Defines contract for poll management, voting, and result retrieval.
 */
export interface IPollService {
  /**
   * Retrieves all polls.
   * @returns Promise resolving to an array of Poll entities.
   */
  findAll(): Promise<Poll[]>;

  /**
   * Retrieves a poll by its ID.
   * @param id - Poll identifier.
   * @returns Promise resolving to a poll response object.
   */
  findById(id: string): Promise<GetPollResponse>;

  /**
   * Creates a new poll.
   * @param createPollCommand - Command containing poll creation data.
   * @returns Promise resolving to the created Poll entity.
   */
  create(createPollCommand: CreatePollCommand): Promise<Poll>;

  /**
   * Retrieves all polls with optional user context.
   * @param query - Optional query with userId and filters.
   * @returns Promise resolving to an array of poll responses.
   */
  getAllPolls(query?: GetAllPollsQuery): Promise<GetPollResponse[]>;

  /**
   * Registers a vote for a poll.
   * @param command - Command containing vote data.
   * @returns Promise resolving to the result of the vote operation.
   */
  vote(command: VotePollCommand): Promise<any>;

  /**
   * Retrieves results for a poll.
   * @param pollId - Poll identifier.
   * @returns Promise resolving to an array of poll result responses.
   */
  getResults(pollId: string): Promise<PollResultResponse[]>;
}
