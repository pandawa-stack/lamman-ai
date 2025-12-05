import axios from 'axios';

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'https://api-production-042c.up.railway.app';

// 1. Register - HARUS /auth/register
export const registerAgent = async (dto: any) => {
  const response = await axios.post(`${AUTH_API_URL}/auth/register`, dto);
  return response.data;
};

// 2. Login - HARUS /auth/login
export const loginAgent = async (dto: any) => {
  const response = await axios.post(`${AUTH_API_URL}/auth/login`, dto);
  return response.data;
};

// 3. Get Profile - HARUS /auth/profile
export const getProfileAgent = async (token: string) => {
  const response = await axios.get(`${AUTH_API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};