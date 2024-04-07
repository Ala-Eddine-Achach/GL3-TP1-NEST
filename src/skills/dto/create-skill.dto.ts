import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  desigantion: string;
}
