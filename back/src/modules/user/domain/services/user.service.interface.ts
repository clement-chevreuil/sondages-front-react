import { RegisterCommand } from 'src/modules/auth/domain/commands/register.command';
import { User } from '../entities/user.entity';

/**
 * Interface for user service.
 * Defines contract for user creation and retrieval operations.
 */
export interface IUserService {
  /**
   * Creates a new user from registration data.
   * @param registerCommand - Command containing registration data.
   * @returns Promise resolving to the created User entity.
   */
  create(registerCommand: RegisterCommand): Promise<User>;

  /**
   * Finds a user by username.
   * @param username - Username to search for.
   * @returns Promise resolving to the User entity or null if not found.
   */
  findByName(username: string): Promise<User | null>;

  /**
   * Finds a user by ID.
   * @param id - User identifier.
   * @returns Promise resolving to the User entity or null if not found.
   */
  findById(id: string): Promise<User | null>;
}
