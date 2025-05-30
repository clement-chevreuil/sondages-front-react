import { AutoMap } from "@automapper/classes";
import { GetPollOptionResponse } from "./get-poll-option";

export class GetPollResponse {

  @AutoMap()
  id: string;

  @AutoMap()
  title: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  singleChoice: boolean;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  options: GetPollOptionResponse[];

  @AutoMap()
  alreadyVoted: boolean = false;
}
