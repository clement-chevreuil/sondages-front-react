import { Poll } from '../entities/poll.entity';
import { PollOption } from '../entities/poll_option.entity';
import { Vote } from '../entities/vote.entity';

/**
 * Abstract repository for poll persistence and retrieval operations.
 * Defines contract for poll, poll option, and vote management.
 */
export abstract class IPollRepository {
  // #region get
  /**
   * Retrieve all polls.
   * @returns Promise resolving to an array of Poll entities.
   */
  abstract findAll(): Promise<Poll[]>;

  /**
   * Retrieve a poll by its unique identifier.
   * @param id - Poll ID
   * @returns Promise resolving to the Poll entity or null if not found.
   */
  abstract findById(id: string): Promise<Poll | null>;

  /**
   * Retrieve a poll option by its unique identifier.
   * @param id - PollOption ID
   * @returns Promise resolving to the PollOption entity or null if not found.
   */
  abstract findPollOptionById(id: string): Promise<PollOption | null>;
  // #endregion

  // #region create
  /**
   * Create and persist a new poll entity.
   * @param poll - Partial poll entity to create
   * @returns Promise resolving to the created Poll entity.
   */
  abstract create(poll: Partial<Poll>): Promise<Poll>;

  /**
   * Add a vote to a poll.
   * @param vote - Partial vote entity to create
   * @returns Promise resolving to the created Vote entity.
   */
  abstract addVote(vote: Partial<Vote>): Promise<Vote>;
  // #endregion

  // #region check
  /**
   * Check if a poll exists by its ID.
   * @param id - Poll ID
   * @returns True if the poll exists, false otherwise.
   */
  abstract existPollId(id: string): Promise<boolean>;

  /**
   * Check if a poll option exists by its ID.
   * @param id - PollOption ID
   * @returns True if the option exists, false otherwise.
   */
  abstract existOptionId(id: string): Promise<boolean>;

  /**
   * Check if a user has already voted for a poll.
   * @param pollId - Poll ID
   * @param userId - User ID
   * @returns True if the user has voted, false otherwise.
   */
  abstract hasUserVotedForPoll(pollId: string, userId: string): Promise<boolean>;
  // #endregion
}
