import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
