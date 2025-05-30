/**
 * Interface for authentication service.
 * Defines contract for user authentication and registration logic.
 */
export interface IAuthService {
  /**
   * Authenticates a user and returns a JWT access token.
   * @param loginCommand - Command containing user credentials.
   * @returns Promise resolving to an object with an access_token property.
   */
  login(loginCommand: any): Promise<{ access_token: string }>;

  /**
   * Registers a new user in the system.
   * @param command - Command containing registration data.
   * @returns Promise resolving to the created user or relevant data.
   */
  register(command: any): Promise<any>;
}
