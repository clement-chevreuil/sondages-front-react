import { BadRequestException } from '@nestjs/common';

export class UsernameAlreadyExistException extends BadRequestException {
  constructor() {
    super(`Le nom d'utilisateur existe déjà.`);
  }
}
