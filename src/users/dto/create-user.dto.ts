import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { User } from '@ngneat/falso';

export class RegisterUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
