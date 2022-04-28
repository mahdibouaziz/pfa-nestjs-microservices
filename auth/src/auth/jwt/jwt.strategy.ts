import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // console.log('PAYLOAD: ', payload);
    // if you want more validaiton in the token (for example in the DB)
    // this is the place to perform validations
    // read the docs https://docs.nestjs.com/security/authentication#implementing-passport-jwt

    return { email: payload.email, type: payload.type };
  }
}
