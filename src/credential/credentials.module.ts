import { Module } from '@nestjs/common';
import { AgentModule } from 'src/agent/agent.module';
import { CredentialsController } from './crednetials.controller';
import { CredentialsService } from './credentials.service';
import { StudentsModule } from 'src/students/students.module';
import { HttpModule } from '@nestjs/axios';
import { AgentService } from 'src/agent/agent.service';

@Module({
  imports: [HttpModule, AgentModule, StudentsModule],
  controllers: [CredentialsController],
  providers: [CredentialsService, AgentService],
})
export class CredentialsModule {}
