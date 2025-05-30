import { Module } from '@nestjs/common';
import { UserService } from './domain/services/user.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    UserRepository,
  ],
  exports: [UserService, 'IUserRepository'],
})
export class UserModule { }