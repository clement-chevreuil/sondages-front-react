export class UserNotAdminException extends Error {
  constructor() {
    super(`L'utilisateur n'est pas un administrateur.`);
  }
}
