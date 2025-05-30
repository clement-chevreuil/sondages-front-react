import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollController } from './interface/controllers/poll.controller';
import { PollService } from './domain/services/poll.service';
import { Poll } from './domain/entities/poll.entity';
import { PollOption } from './domain/entities/poll_option.entity';
import { PollRepositoryImpl } from './infrastructure/repositories/poll.repository';
import { MappingProfile } from './domain/mapping/mapping.profile';
import { AutomapperModule } from '@automapper/nestjs';
import { UserModule } from '../user/user.module';
import { Vote } from './domain/entities/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Poll, PollOption, Vote]),
    AutomapperModule,
    UserModule,
  ],
  controllers: [PollController],
  providers: [
    PollService,
    MappingProfile,
    {
      provide: 'IPollRepository',
      useClass: PollRepositoryImpl,
    },
    PollRepositoryImpl,
  ],
  exports: [PollService],
})
export class PollModule { }
