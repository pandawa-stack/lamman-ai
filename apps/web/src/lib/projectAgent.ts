// File: apps/web/src/lib/projectAgent.ts

import axios from 'axios';

// ✅ STANDARDISASI URL BACKEND
const rawBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api-production-042c.up.railway.app';
const API_BASE_URL = rawBaseUrl.replace(/\/$/, '');
const PROJECT_URL = `${API_BASE_URL}/projects`;

// Helper untuk mendapatkan Authorization Header
const getAuthHeader = () => {
  if (typeof window === 'undefined') return {}; 
  
  const storageStr = localStorage.getItem('lamman-auth-storage');
  if (!storageStr) return {};
  
  try {
    const storage = JSON.parse(storageStr);
    const token = storage.state?.accessToken;
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  } catch (error) {
    console.error('Error parsing auth storage:', error);
    return {};
  }
};

// 1. Simpan Project
export const saveProjectAgent = async (data: any) => {
  const response = await axios.post(PROJECT_URL, data, getAuthHeader());
  return response.data;
};

// 2. Fetch All Projects
export const fetchProjectsAgent = async () => {
  const response = await axios.get(PROJECT_URL, getAuthHeader());
  return response.data;
};

// 3. Delete Project
export const deleteProjectAgent = async (id: string) => {
  const response = await axios.delete(`${PROJECT_URL}/${id}`, getAuthHeader());
  return response.data;
};

// 4. Fetch One Project by ID
export const fetchProjectByIdAgent = async (id: string) => {
  const response = await axios.get(`${PROJECT_URL}/${id}`, getAuthHeader());
  return response.data;
};

// 5. Publish Project (Pemicu Upload ke Blob Storage)
export const publishProjectAgent = async (id: string, slug: string) => {
  // Backend akan memproses upload ke Vercel Blob dan mengembalikan URL final
  const response = await axios.patch(`${PROJECT_URL}/${id}/publish`, { slug }, getAuthHeader());
  return response.data;
};

// ❌ Fungsi 'fetchPublicSiteAgent' DIHAPUS karena frontend tidak lagi merender halaman publik.