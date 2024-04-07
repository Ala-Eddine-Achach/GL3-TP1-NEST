import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCvDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  firstname: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  cin: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  job: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  path: string;
}
