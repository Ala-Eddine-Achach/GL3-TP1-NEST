import { Module } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CvsController } from './cvs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { UsersModule } from '../users/users.module';
import { SkillsModule } from '../skills/skills.module';
import { User } from '../users/entities/user.entity';
import { Skill } from '../skills/entities/skill.entity';

@Module({
  controllers: [CvsController],
  imports: [
    TypeOrmModule.forFeature([Cv, User, Skill]),
    UsersModule,
    SkillsModule,
  ],
  providers: [CvsService],
})
export class CvsModule {}
