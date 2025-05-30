// Application Layer: User Service
import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository.interface';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { IUserService } from './user.service.interface';
import { UsernameAlreadyExistException } from '../exceptions/username-already-exist.exception';
import { RegisterCommand } from 'src/modules/auth/domain/commands/register.command';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository
  ) { }

  async create(registerCommand: RegisterCommand): Promise<User> {
    const existingUser = await this.userRepository.existUsername(registerCommand.username);

    if (existingUser) {
      throw new UsernameAlreadyExistException();
    }

    const user = new User();
    user.username = registerCommand.username;
    user.password = await bcrypt.hash(registerCommand.password, 10);
    return this.userRepository.create(user);
  }

  async findByName(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
