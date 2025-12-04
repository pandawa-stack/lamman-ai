// File: apps/web/src/lib/authAgent.ts

import axios from 'axios';
import { RegisterDto, LoginDto } from './dtos/auth.dto';

// Ganti: const AUTH_API_URL = 'http://localhost:3001/auth';

// Deklarasi AUTH_API_URL dari environment variable
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'https://api-production-042c.up.railway.app';

// --- Interface untuk Respons ---
interface AuthResponse {
  access_token: string;
}

// 1. Panggilan Register (Sign-up)
export const registerAgent = async (dto: RegisterDto): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${AUTH_API_URL}/register`, dto);
  return response.data;
};

// 2. Panggilan Login (Sign-in)
export const loginAgent = async (dto: LoginDto): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${AUTH_API_URL}/login`, dto);
  return response.data;
};