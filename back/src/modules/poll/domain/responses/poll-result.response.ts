import { AutoMap } from '@automapper/classes';

export class PollResultResponse {
  @AutoMap()
  optionId: string;

  @AutoMap()
  label: string;

  @AutoMap()
  count: number;
}
