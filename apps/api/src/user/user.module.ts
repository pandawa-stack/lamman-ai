// File: apps/api/src/user/user.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// Import DatabaseModule dari local package
import { DatabaseModule } from '@repo/database'; 

@Module({
  imports: [DatabaseModule], // ✅ Tambahkan DatabaseModule di sini
  providers: [UserService],
  exports: [UserService], // ✅ Eksport UserService agar bisa dipakai di AuthModule
})
export class UserModule {}