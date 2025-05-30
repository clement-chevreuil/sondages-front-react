export class InvalidPasswordException extends Error {
  constructor() {
    super('Mot de passe invalide');
    this.name = 'InvalidPasswordException';
  }
}
