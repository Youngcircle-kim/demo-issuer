import { Controller, Get } from '@nestjs/common';
import { SchemasService } from './schemas.service';

@Controller('schemas')
export class SchemasController {
  constructor(private schemasService: SchemasService) {}

  @Get()
  async getSchemas() {
    return await this.schemasService.getSchemas();
  }
}
