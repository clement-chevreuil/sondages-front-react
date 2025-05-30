import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterCommand {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
