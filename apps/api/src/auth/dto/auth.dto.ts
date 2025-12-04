// File: apps/api/src/auth/dto/auth.dto.ts

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password minimal harus 6 karakter' })
  password: string;

  // Anda bisa menambahkan username di sini jika diperlukan
  // @IsString()
  // @IsNotEmpty()
  // username: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}