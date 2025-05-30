import { AutoMap } from "@automapper/classes";

export class GetPollOptionResponse {

  @AutoMap()
  id: string;

  @AutoMap()
  label: string;
}
