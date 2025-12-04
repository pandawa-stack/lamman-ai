// File: apps/api/src/auth/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common'; // Tambah Logger
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  email: string;
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(configService: ConfigService) {
    // 1. Coba ambil secret
    const secret = configService.get<string>('JWT_SECRET');

    // 2. LOGGING DEBUG (Cek log Railway nanti)
    if (!secret) {
      console.error('🚨 CRITICAL: JWT_SECRET is NOT defined in Environment Variables!');
      console.log('Current Env Keys:', Object.keys(process.env)); // Intip env apa saja yang ada
    } else {
      console.log('✅ JWT_SECRET is successfully loaded.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 3. FALLBACK: Gunakan string acak jika kosong agar server TIDAK CRASH loop
      // (Tapi login akan error 401 jika env asli tidak masuk)
      secretOrKey: secret || 'temporary_fallback_secret_to_prevent_crash',
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}