export class UserNotFoundException extends Error {
  constructor(userId: string) {
    super(`Utilisateur non trouvé.`);
  }
}
