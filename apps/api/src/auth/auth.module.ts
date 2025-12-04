// File: apps/api/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ✅ Import ConfigModule
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    // ✅ KONFIGURASI JWT YANG AMAN
    JwtModule.registerAsync({
      imports: [ConfigModule], // Pastikan ConfigModule diimpor di sini
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        
        // Validasi saat runtime agar kita tahu kalau env var hilang
        if (!secret) {
            throw new Error('JWT_SECRET environment variable is missing!');
        }

        return {
          secret: secret,
          signOptions: { expiresIn: '7d' },
        };
      },
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  controllers: [AuthController], 
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}