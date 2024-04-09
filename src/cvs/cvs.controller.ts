import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

import { AgeCriteriaDto } from './dto/age-cretiria.dto';
import { Cv } from './entities/cv.entity';

@Controller('cvs')
export class CvsController {
  constructor(private readonly cvsService: CvsService) {}

  @Post()
  create(
    @Body() createCvDto: CreateCvDto,
    @Query('userId') userId: string,
    @Query('skillIds') skillIds: string[],
  ) {
    return this.cvsService.create(createCvDto, userId, skillIds);
  }

  @Get()
  findAll() {
    return this.cvsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvsService.findOne(id);
  }
  @Get('search')
  findByAgeCriteria(@Query() ageCriteria: AgeCriteriaDto) {
    return this.cvsService.findByAgeCriteria(
      ageCriteria.age,
      ageCriteria.criteria,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvsService.update(id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvsService.remove(id);
  }
  @Get()
  async getAll(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<Cv[]> {
    return this.cvsService.findAllPaginated(page, pageSize);
  }
}
