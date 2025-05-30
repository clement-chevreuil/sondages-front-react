import { NotFoundException } from '@nestjs/common';

export class PollNotFoundException extends NotFoundException {
  constructor(message: string = 'Sondage introuvable') {
    super(message);
  }
}