// File: apps/web/src/lib/projectAgent.ts

import axios from 'axios';
import { CreateProjectDto } from './dtos/project.dto'; // Kita buat type-nya inline saja biar cepat atau import dari store

//Ganti: const API_URL = 'http://localhost:3001/projects';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
const API_URL = `${API_BASE_URL}/projects`;

// Helper untuk mengambil Token dari LocalStorage
const getAuthHeader = () => {
  // Zustand menyimpan data di localStorage dengan key 'lamman-auth-storage'
  // Struktur: { state: { accessToken: "...", ... }, version: 0 }
  const storageStr = localStorage.getItem('lamman-auth-storage');
  if (!storageStr) return {};
  
  const storage = JSON.parse(storageStr);
  const token = storage.state?.accessToken;
  
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// 1. Simpan Project Baru
export const saveProjectAgent = async (data: any) => {
  const response = await axios.post(API_URL, data, getAuthHeader());
  return response.data;
};

// 2. Ambil Semua Project
export const fetchProjectsAgent = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

// 3. Hapus Project
export const deleteProjectAgent = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};

// 4. Ambil Detail Project by ID
export const fetchProjectByIdAgent = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};

// 5. Publish Project (Memerlukan Login)
export const publishProjectAgent = async (id: string, slug: string) => {
    // Endpoint: PATCH /projects/:id/publish
    const response = await axios.patch(`${API_URL}/${id}/publish`, { slug }, getAuthHeader());
    return response.data;
};

// 6. Fetch Public Site (Tanpa Login - Akses Publik)
export const fetchPublicSiteAgent = async (slug: string) => {
    // URL Backend: http://localhost:3001/sites/:slug
    const url = `http://localhost:3001/sites/${slug}`; 
    
    // ✅ PERBAIKAN: Gunakan native fetch()
    const response = await fetch(url, { 
        // Penting: Matikan cache (agar perubahan segera terlihat)
        cache: 'no-store' 
    }); 
    
    if (!response.ok) {
        // Jika status adalah 404, kita throw error agar Next.js memunculkan halaman Not Found
        if (response.status === 404) {
            throw new Error('Not Found'); 
        }
        // Jika 500, throw error umum
        throw new Error('Failed to fetch site data.');
    }

    // Backend mengembalikan JSON: { htmlContent: "...", isPublished: true }
    const data = await response.json(); 
    return data;
};