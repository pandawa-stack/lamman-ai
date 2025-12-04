// File: apps/api/src/auth/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Interface untuk payload JWT
export interface JwtPayload {
  email: string;
  sub: string; // User ID
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Mengambil secret dari .env
    });
  }

  // Fungsi validate ini dipanggil setiap kali token dikirim (kecuali rute publik)
  async validate(payload: JwtPayload) {
    // Kita hanya perlu mengembalikan payload karena token sudah divalidasi oleh Passport
    return { userId: payload.sub, email: payload.email };
  }
}