import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginCommand {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
