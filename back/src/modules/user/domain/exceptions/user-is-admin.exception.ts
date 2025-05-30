export class UserIsAdminException extends Error {
  constructor() {
    super(`L'utilisateur est  un administrateur il n'a pas le droit d'éffectuer cette action.`);
  }
}
