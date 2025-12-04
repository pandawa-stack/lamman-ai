// File: apps/api/src/auth/auth.service.ts

import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // --- 1. VALIDASI LOGIN (DIPAKAI OLEH PASSPORT LOCAL STRATEGY) ---

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      // Hapus password dari objek user sebelum dikembalikan
      const { password, ...result } = user;
      return result; 
    }
    return null;
  }
  
  // --- 2. LOGIN (Mengeluarkan JWT Token) ---

  async login(user: any) {
    // Payload JWT hanya berisi data yang tidak sensitif
    const payload = { email: user.email, sub: user.id };
    
    this.logger.log(`User logged in: ${user.email}`);
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // --- 3. REGISTRASI (Menyimpan User Baru) ---

  async register(dto: RegisterDto) {
    const existingUser = await this.userService.findOneByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar.');
    }

    // Hashing password sebelum disimpan ke database
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const user = await this.userService.create({
        email: dto.email,
        password: hashedPassword,
    });
    
    // Langsung loginkan user yang baru terdaftar
    return this.login(user);
  }
}