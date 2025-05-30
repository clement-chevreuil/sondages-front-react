export class UserNotFoundException extends Error {
  constructor() {
    super('Utilisateur non trouvé');
    this.name = 'UserNotFoundException';
  }
}
