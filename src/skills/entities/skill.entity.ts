import { Cv } from '../../cvs/entities/cv.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Timestamp } from 'typeorm/browser';
import { TimestampEntity } from '../../generics/timestamp.entity';

@Entity()
export class Skill extends TimestampEntity {
  @Column()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  desigantion: string;

  @ManyToMany(() => Cv, (cv) => cv.skills)
  cvs: Cv[];
}
