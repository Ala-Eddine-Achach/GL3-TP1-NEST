import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { CvsModule } from '../cvs/cvs.module';
import { UsersModule } from '../users/users.module';
import { SkillsModule } from '../skills/skills.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';

@Module({
  imports: [
    CvsModule,
    UsersModule,
    SkillsModule,
    ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),
    TypeOrmCoreModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tp1_nest_cvdb',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    CvsModule,
    SkillsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class SeederModule {}
