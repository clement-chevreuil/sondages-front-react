import { BadRequestException } from '@nestjs/common';

export class UserAlreadyVoteException extends BadRequestException {
  constructor() {
    super("L'utilisateur a déjà voté pour ce sondage");
  }
}
