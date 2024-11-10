import { AgentService } from 'src/agent/agent.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SchemasService {
  constructor(private readonly agentService: AgentService) {}

  async getSchemas() {
    return await this.agentService.getSchemas();
  }
}
