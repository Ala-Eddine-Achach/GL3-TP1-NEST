import { NestFactory } from '@nestjs/core';
import {
  randEmail,
  randFilePath,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
  randPassword,
  randSkill,
  randUserName,
} from '@ngneat/falso';
import { SeederModule } from './seeder.module';
import { CvsService } from '../cvs/cvs.service';
import { UsersService } from '../users/users.service';
import { SkillsService } from '../skills/skills.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const cvService = app.get(CvsService);
  const userServices = app.get(UsersService);
  const skillService = app.get(SkillsService);
  const skills = [];
  for (let i = 0; i < 10; i++) {
    const skill = await skillService.create({ desigantion: randSkill() });
    skills.push(skill);
    //save skills
  }
  for (let i = 0; i < 10; i++) {
    const user = await userServices.create({
      username: randUserName(),
      email: randEmail(),
      password: randPassword(),
    });

    const skillIds = [];
    skills.slice(0, i).map((skill) => {
      skillIds.push(skill.id);
    });
    await cvService.create(
      {
        name: randLastName(),
        firstname: randFirstName(),
        age: i + 18,
        path: randFilePath(),
        job: randJobTitle(),
        cin: randNumber().toString(),
      },
      user.id,
      skillIds,
    );
  }
  await app.close();
}
bootstrap();
