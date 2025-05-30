// User Repository Interface (Domain Layer)
import { User } from '../entities/user.entity';

/**
 * Interface for user repository.
 * Defines contract for user persistence and retrieval operations.
 */
export interface IUserRepository {
  // #region GET
  /**
   * Retrieve a user by their unique identifier.
   * @param id - User ID
   * @returns The user entity or null if not found.
   */
  findById(id: string): Promise<User | null>;

  /**
   * Retrieve a user by their username.
   * @param username - Username
   * @returns The user entity or null if not found.
   */
  findByUsername(username: string): Promise<User | null>;
  // #endregion

  // #region CREATE
  /**
   * Create and persist a new user entity.
   * @param user - User entity to save
   * @returns The saved user entity.
   */
  create(user: User): Promise<User>;
  // #endregion

  // #region CHECK
  /**
   * Check if a user exists by their ID.
   * @param id - User ID
   * @returns True if the user exists, false otherwise.
   */
  existUserId(id: string): Promise<boolean>;

  /**
   * Check if a user exists by their username.
   * @param username - Username
   * @returns True if the username exists, false otherwise.
   */
  existUsername(username: string): Promise<boolean>;
  // #endregion
}
