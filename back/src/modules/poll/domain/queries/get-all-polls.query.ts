// Query DTO for getting all polls with userId context
import { IsString, IsNotEmpty } from 'class-validator';

export class GetAllPollsQuery {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
