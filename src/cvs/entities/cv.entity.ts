import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Skill } from '../../skills/entities/skill.entity';
import { User } from '../../users/entities/user.entity';
import { TimestampEntity } from '../../generics/timestamp.entity';

@Entity()
export class Cv extends TimestampEntity {
  @Column()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  name: string;
  @Column()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  firstname: string;
  @Column()
  @IsNotEmpty()
  age: number;
  @Column()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  cin: string;
  @Column()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  job: string;
  @Column()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  path: string;

  @ManyToOne(() => User, (user) => user.cvs, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;
  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];
}
