// File: apps/api/src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@repo/database'; // Import PrismaService dari local package

// Asumsi: DTO untuk CreateUserDto akan dibuat nanti, tapi kita siapkan struktur datanya
type UserPayload = {
    email: string;
    password: string;
    username?: string;
};

@Injectable()
export class UserService {
  // Injeksi PrismaService
  constructor(private prisma: PrismaService) {}

  // 1. Mencari User berdasarkan Email (Digunakan saat Login)
  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // 2. Membuat User Baru (Digunakan saat Sign-up)
  async create(data: UserPayload) {
    // Catatan: Password harus di-hash di AuthService sebelum fungsi ini dipanggil
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password, // Sudah di-hash
        // Jika Anda ingin menambahkan username, uncomment baris ini
        // username: data.username || data.email, 
      },
    });
  }

  // 3. Mencari User berdasarkan ID
  async findOneById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}