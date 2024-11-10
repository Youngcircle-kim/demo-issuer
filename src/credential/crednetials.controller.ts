import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialDto } from './dto/crednetial.dto';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async makeCredentials(@Body() credentialDto: CredentialDto) {
    return await this.credentialsService.handleCredentialData(credentialDto);
  }
}
