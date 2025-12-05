import axios from 'axios';
import { RegisterDto, LoginDto } from './dtos/auth.dto';

// 🔥 TEMPORARY HARDCODE - untuk test
const API_BASE_URL = 'https://api-production-042c.up.railway.app';
const AUTH_URL = `${API_BASE_URL}/auth`;

// 🔍 DEBUG LOG
console.log('🚀 AUTH_URL:', AUTH_URL);

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