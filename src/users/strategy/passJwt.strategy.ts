import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { PayloadJwtTokenInterface } from '../jwt-token/jwt-token.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

export class PassportJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadJwtTokenInterface): Promise<Partial<User>> {
    //console.log(payload);
    const user: User = await this.userRepository.findOne({
      where: { id: payload.id },
    });
    //console.log(user);
    if (user) {
      delete user.salt;
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
