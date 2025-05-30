// AuthController for login
import { Controller, Post, Body } from '@nestjs/common';
import { LoginCommand } from '../../domain/commands/login.command';
import { RegisterCommand } from '../../domain/commands/register.command';
import { AuthService } from '../../domain/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() command: LoginCommand) {
    return this.authService.login(command);
  }

  @Post('register')
  async register(@Body() command: RegisterCommand) {
    return this.authService.register(command);
  }
}