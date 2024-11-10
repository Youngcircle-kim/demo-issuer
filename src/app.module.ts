import { Module } from '@nestjs/common';
import { ConnectionsModule } from './connections/connections.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CredentialsModule } from './credential/credentials.module';
import { SchemasModule } from './schema/schemas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './departments/department.entity';
import { Student } from './students/student.entity';
import { Certificate } from './certificates/certificate.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type:
          configService.get<'mysql' | 'postgres' | 'mariadb'>('DB_TYPE') ||
          'mysql',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: parseInt(configService.get<string>('DB_PORT'), 10) || 3306,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Department, Student, Certificate],
        synchronize: configService.get<string>('SYNCHRONIZE') === 'true',
      }),
      inject: [ConfigService],
    }),
    ConnectionsModule,
    CredentialsModule,
    SchemasModule,
  ],
})
export class AppModule {}
