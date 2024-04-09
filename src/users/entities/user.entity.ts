import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';
import { Cv } from '../../cvs/entities/cv.entity';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { UserRoleEnum } from '../../enum/roles.enum';

@Entity()
export class User extends TimestampEntity {
  @Column()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Column()
  @IsNotEmpty()
  salt: string;
  @Column()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
  @Column()
  @IsNotEmpty()
  //enum
  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;
  @OneToMany(() => Cv, (cv) => cv.user)
  cvs: Cv[];
}
