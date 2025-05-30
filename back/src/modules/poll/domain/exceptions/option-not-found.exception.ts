import { NotFoundException } from '@nestjs/common';

export class OptionNotFoundException extends NotFoundException {
  constructor(message: string = "Option introuvable") {
    super(message);
  }
}
