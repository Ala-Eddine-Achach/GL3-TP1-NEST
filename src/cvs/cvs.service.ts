import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { Skill } from '../skills/entities/skill.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(Cv)
    private cvsRepository: Repository<Cv>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Cv>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(
    newCv: CreateCvDto,
    user: string,
    skillIds: string[],
  ): Promise<Cv> {
    const cv = this.cvsRepository.create(newCv);
    const userrep = await this.userRepository.findOneBy({ id: user });

    if (!userrep) {
      throw new Error('User not found');
    }
    cv.user = userrep;
    const skills = [];
    for (const skillId of skillIds) {
      const skill = await this.skillRepository.findOneBy({ id: skillId });
      if (!skill) {
        throw new Error('Skill not found');
      }
      skills.push(skill);
    }
    cv.skills = skills;
    return await this.cvsRepository.save(cv);
  }

  findAll() {}

  findOne(id: number) {
    return `This action returns a #${id} cv`;
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  remove(id: number) {
    return `This action removes a #${id} cv`;
  }
}
