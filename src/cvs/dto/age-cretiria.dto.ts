import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AgeCriteriaDto {
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  criteria: string;
}
