import axios from 'axios';

// ✅ STANDARDISASI URL
const rawBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api-production-042c.up.railway.app';
const API_BASE_URL = rawBaseUrl.replace(/\/$/, '');
const PROJECT_URL = `${API_BASE_URL}/projects`; // Endpoint khusus Projects

// Helper Header
const getAuthHeader = () => {
  const storageStr = localStorage.getItem('lamman-auth-storage');
  if (!storageStr) return {};
  const storage = JSON.parse(storageStr);
  const token = storage.state?.accessToken;
  return { headers: { Authorization: `Bearer ${token}` } };
};

// 1. Simpan Project
export const saveProjectAgent = async (data: any) => {
  const response = await axios.post(PROJECT_URL, data, getAuthHeader());
  return response.data;
};

// 2. Fetch All
export const fetchProjectsAgent = async () => {
  const response = await axios.get(PROJECT_URL, getAuthHeader());
  return response.data;
};

// 3. Delete
export const deleteProjectAgent = async (id: string) => {
  const response = await axios.delete(`${PROJECT_URL}/${id}`, getAuthHeader());
  return response.data;
};

// 4. Fetch One
export const fetchProjectByIdAgent = async (id: string) => {
  const response = await axios.get(`${PROJECT_URL}/${id}`, getAuthHeader());
  return response.data;
};

// 5. Publish
export const publishProjectAgent = async (id: string, slug: string) => {
    const response = await axios.patch(`${PROJECT_URL}/${id}/publish`, { slug }, getAuthHeader());
    return response.data;
};

// 6. Fetch Public Site (Native Fetch untuk Server Component)
export const fetchPublicSiteAgent = async (slug: string) => {
    // Endpoint khusus: /sites
    const url = `${API_BASE_URL}/sites/${slug}`;
    
    const response = await fetch(url, { 
        cache: 'no-store' 
    }); 
    
    if (!response.ok) {
        if (response.status === 404) throw new Error('Not Found');
        throw new Error('Failed to fetch site data.');
    }

    const data = await response.json(); 
    return data;
};