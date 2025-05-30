import { PollOption } from '../entities/poll_option.entity';
import { IsString, IsNotEmpty, ValidateNested, ArrayMinSize, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { AutoMap } from '@automapper/classes';


export class CreatePollCommand {

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  title: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  description: string;

  @AutoMap()
  @IsBoolean()
  singleChoice: boolean;

  @AutoMap()
  @ValidateNested({ each: true })
  @Type(() => PollOptionSubCommand)
  @ArrayMinSize(1)
  options: PollOptionSubCommand[];

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class PollOptionSubCommand {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  text: string;
}

