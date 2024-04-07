import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}
  async create(createSkillDto: CreateSkillDto) {
    const skill = this.skillsRepository.create({ ...createSkillDto });
    return this.skillsRepository.save(skill);
  }
  async findAll() {
    return this.skillsRepository.find();
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    return this.skillsRepository.update(id, { ...updateSkillDto });
  }
  async remove(id: number) {
    return this.skillsRepository.delete(id);
  }
}
