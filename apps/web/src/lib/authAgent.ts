import axios from 'axios';
import { RegisterDto, LoginDto } from './dtos/auth.dto';

// ✅ STANDARDISASI URL
const rawBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api-production-042c.up.railway.app';
const API_BASE_URL = rawBaseUrl.replace(/\/$/, '');
const AUTH_URL = `${API_BASE_URL}/auth`; // Endpoint khusus Auth

// 🔍 TEMPORARY DEBUG - Hapus setelah selesai
console.log('🚀 AUTH_URL:', AUTH_URL);
console.log('🌍 NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);

interface AuthResponse {
  access_token: string;
}

// 1. Register
export const registerAgent = async (dto: RegisterDto): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${AUTH_URL}/register`, dto);
  return response.data;
};

// 2. Login
export const loginAgent = async (dto: LoginDto): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${AUTH_URL}/login`, dto);
  return response.data;
};

// 3. Get Profile
export const getProfileAgent = async (token: string) => {
  const response = await axios.get(`${AUTH_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};