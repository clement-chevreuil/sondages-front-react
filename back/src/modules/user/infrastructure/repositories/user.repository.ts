// Infrastructure Layer: User Repository Implementation (TypeORM)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) { }

  // #region get
  async findById(id: string): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repo.findOneBy({ username });
  }
  // #endregion

  // #region create
  async create(user: User): Promise<User> {
    return this.repo.save(user);
  }
  // #endregion

  // #region check
  async existUserId(id: string): Promise<boolean> {
    const count = await this.repo.count({ where: { id } });
    return count > 0;
  }

  async existUsername(username: string): Promise<boolean> {
    const count = await this.repo.count({ where: { username } });
    return count > 0;
  }
  // #endregion
}
