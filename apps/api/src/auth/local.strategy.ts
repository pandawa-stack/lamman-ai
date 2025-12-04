// File: apps/api/src/auth/local.strategy.ts

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ 
      usernameField: 'email', // Menggunakan 'email' sebagai field username
      passwordField: 'password'
    });
  }

  // Fungsi validate ini akan dipanggil oleh Passport saat login
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Kredensial email atau password salah');
    }
    
    // Jika valid, kembalikan objek user (tanpa password)
    return user;
  }
}