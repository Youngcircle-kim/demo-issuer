import { IsNotEmpty, IsJSON } from 'class-validator';

export class AcceptInvitationDto {
  @IsNotEmpty()
  @IsJSON()
  invitation_object: string;
}
