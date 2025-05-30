import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, forMember, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreatePollCommand, PollOptionSubCommand } from '../commands/create-poll.command';
import { Poll } from '../entities/poll.entity';
import { PollOption } from '../entities/poll_option.entity';
import { GetPollResponse } from '../responses/get-poll.response';
import { GetPollOptionResponse } from '../responses/get-poll-option';
import { PollResultResponse } from '../responses/poll-result.response';

@Injectable()
export class MappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CreatePollCommand, Poll,
        forMember(
          (dest) => dest.options,
          mapFrom((src) => src.options.map((option) => this.mapper.map(option, PollOptionSubCommand, PollOption)))
        ),
      )

      createMap(mapper, PollOptionSubCommand, PollOption,
        forMember(
          (dest) => dest.label,
          mapFrom((src) => src.text)
        )
      );

      createMap(
        mapper,
        Poll,
        GetPollResponse,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.id.toString())
        ),
        forMember(
          (dest) => dest.options,
          mapFrom((src) => src.options.map((option) => this.mapper.map(option, PollOption, GetPollOptionResponse)))
        )

      );

      createMap(
        mapper,
        PollOption,
        GetPollOptionResponse
      );

      createMap(
        mapper,
        PollResultResponse,
        PollResultResponse,
        forMember(
          (dest) => dest.optionId,
          mapFrom((src) => src.optionId)
        ),
        forMember(
          (dest) => dest.label,
          mapFrom((src) => src.label)
        ),
        forMember(
          (dest) => dest.count,
          mapFrom((src) => src.count)
        )
      );
    };

  }
}
