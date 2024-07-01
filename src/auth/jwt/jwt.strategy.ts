import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PayloadModel } from '../payload.model';
import { ConfigService } from '@nestjs/config';
import configuration from '../../config/configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: configuration().ignoreExpiration,
      secretOrKey: configService.get<string>("jwtSecret"),
    });
  }

  async validate(payload: PayloadModel) {
    return { id: payload.id, correo: payload.email, role: payload.role };
  }
}