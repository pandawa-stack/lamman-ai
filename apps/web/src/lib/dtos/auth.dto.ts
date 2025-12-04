// File: apps/web/src/lib/dtos/auth.dto.ts

// Kita tidak perlu Class Validator di frontend, cukup interface
export interface RegisterDto {
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}