import { PartialType } from '@nestjs/mapped-types';
import { CreateCvDto } from './create-cv.dto';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateCvDto extends PartialType(CreateCvDto) {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  firstname: string;

  @IsOptional()
  age: number;

  @IsOptional()
  @MinLength(8)
  @MaxLength(8)
  cin: string;

  @IsOptional()
  @MinLength(4)
  @MaxLength(8)
  job: string;

  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  path: string;
}
