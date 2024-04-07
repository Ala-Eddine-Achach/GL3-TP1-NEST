import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from './create-skill.dto';
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UpdateSkillDto extends PartialType(CreateSkillDto) {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  designation: string;
}
