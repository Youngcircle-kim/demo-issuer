import { Module } from '@nestjs/common';
import { AgentModule } from 'src/agent/agent.module';
import { SchemasController } from './schemas.controller';
import { SchemasService } from './schemas.service';

@Module({
  imports: [AgentModule],
  controllers: [SchemasController],
  providers: [SchemasService],
})
export class SchemasModule {}
