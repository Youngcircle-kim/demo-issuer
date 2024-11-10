import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
})
export class DepartmentsModule {}
