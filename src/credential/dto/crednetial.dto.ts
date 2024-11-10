import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialDto {
  @IsNotEmpty()
  @IsString()
  connectionId: string;

  @IsNotEmpty()
  @IsString()
  schemaId: string;

  @IsNotEmpty()
  @IsString()
  credentialDefinitionId: string;

  @IsNotEmpty()
  @IsString()
  certificateType: string;

  @IsNotEmpty()
  @IsString()
  did: string;
}
