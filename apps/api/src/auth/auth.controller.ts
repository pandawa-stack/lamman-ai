// File: apps/api/src/auth/auth.controller.ts

import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/register
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    // Memanggil AuthService untuk hashing password dan membuat user baru
    return this.authService.register(dto);
  }

  // POST /auth/login
  // Memicu LocalStrategy (LocalAuthGuard) untuk memvalidasi kredensial
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() dto: LoginDto) {
    // Jika Guard sukses, req.user sudah berisi objek user
    return this.authService.login(req.user);
  }

  // GET /auth/profile
  // Rute terproteksi: Memerlukan JWT yang valid di header
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // Jika Guard sukses, req.user berisi payload JWT
    return { 
        message: 'Akses terproteksi berhasil',
        user: req.user
    };
  }
}