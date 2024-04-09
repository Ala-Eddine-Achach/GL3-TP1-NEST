import { PartialType } from '@nestjs/mapped-types';

import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class LoginUserDto extends PartialType(User) {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
