import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginCommand } from './commands/login.command';
import { UserService } from 'src/modules/user/domain/services/user.service';
import { RegisterCommand } from './commands/register.command';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { InvalidPasswordException } from './exceptions/invalid-password.exception';
import { IAuthService } from './auth.service.interface';
import { UsernameAlreadyExistException } from '../../user/domain/exceptions/username-already-exist.exception';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { IUserRepository } from 'src/modules/user/domain/repositories/user.repository.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private usersService: UserService, private jwtService: JwtService) { }

  async login(loginCommand: LoginCommand) {
    const user = await this.usersService.findByName(loginCommand.username);
    if (!user) {
      throw new UserNotFoundException();
    }

    const isMatch = await bcrypt.compare(loginCommand.password, user.password);
    if (!isMatch) {
      throw new InvalidPasswordException();
    }

    const payload = { username: user.username, sub: user.id, isAdmin: user.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(command: RegisterCommand) {
    const existingUser = await this.userRepository.existUsername(command.username);

    if (existingUser) {
      throw new UsernameAlreadyExistException();
    }

    const user = new User();
    user.username = command.username;
    user.password = await bcrypt.hash(command.password, 10);
    return this.userRepository.create(user);
  }
}
