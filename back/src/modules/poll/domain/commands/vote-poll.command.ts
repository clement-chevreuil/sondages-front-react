import { AutoMap } from '@automapper/classes';
import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class VotePollCommand {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  pollId: string;

  @AutoMap()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  optionIds: string[];

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  userId: string; // à adapter selon la gestion utilisateur
}
