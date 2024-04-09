import { Injectable, NotFoundException } from "@nestjs/common";
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

  findOne(id: string) {
    return this.cvsRepository.findOneBy({ id: id });
  }
  findByAgeCriteria(age: number, criteria: string) {
    return this.cvsRepository
      .createQueryBuilder('cv')
      .where('cv.age = :age', { age })
      .orWhere('cv.name LIKE :criteria', { criteria: `%${criteria}%` })
      .orWhere('cv.firstname LIKE :criteria', { criteria: `%${criteria}%` })
      .orWhere('cv.job LIKE :criteria', { criteria: `%${criteria}%` })
      .getMany();
  }

  update(id: string, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  remove(id: string) {
    return `This action removes a #${id} cv`;
  }
  async findAllPaginated(page: number, pageSize: number): Promise<Cv[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.cvsRepository.find({
      skip,
      take,
    });
  }
  findOneById(id: string, user: Partial<User>) {
    return this.cvsRepository.findOneBy({ id, user });
  }

  async updateFilePath(id: string, Filepath: string, user: Partial<User>) {
    const cv = await this.findOneById(id, user);
    if (!cv) throw new NotFoundException(`le cv d'id ${id} n'existe pas`);
    cv.path = Filepath;
    console.log('File added/updated successfully !');
    await this.cvsRepository.save(cv);
  }
}
