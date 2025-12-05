// File: apps/web/src/lib/projectAgent.ts
import axios from 'axios';

// ✅ STANDARDISASI URL BACKEND (AMAN UNTUK CLIENT & SERVER)
const rawBaseUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'https://api-production-042c.up.railway.app';

const API_BASE_URL = rawBaseUrl.replace(/\/$/, '');
const PROJECT_URL = `${API_BASE_URL}/projects`;

// 🔍 DEBUG LOG (hanya jalan di browser)
if (typeof window !== 'undefined') {
  console.log('🔧 PROJECT_URL:', PROJECT_URL);
  console.log('🌍 NEXT_PUBLIC_BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
}

// Helper untuk mendapatkan Authorization Header (hanya di client)
const getAuthHeader = () => {
  if (typeof window === 'undefined') return {}; // SSR: tidak ada localStorage

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

// 5. Publish Project (set slug publik, ex: "booq-erp")
export const publishProjectAgent = async (id: string, slug: string) => {
  const response = await axios.patch(
    `${PROJECT_URL}/${id}/publish`,
    { slug },
    getAuthHeader(),
  );
  return response.data;
};

// 6. Fetch Public Site (bisa dipanggil dari Client Component & Server Component)
type PublicSiteResponse = {
  htmlContent: string;
  slug?: string;
  title?: string;
  [key: string]: any;
};

export const fetchPublicSiteAgent = async (
  slug: string,
): Promise<PublicSiteResponse> => {
  // Endpoint backend: GET /sites/:slug (public, no auth)
  const url = `${API_BASE_URL}/sites/${slug}`;

  try {
    const response = await fetch(url, {
      // Next.js: non-cache agar selalu ambil data terbaru
      cache: 'no-store',
      // Next.js App Router hint (ignored di browser, dipakai di server)
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Site not found');
      }
      throw new Error(`Failed to fetch site: ${response.statusText}`);
    }

    const data = (await response.json()) as PublicSiteResponse;

    // Validasi minimal
    if (!data.htmlContent) {
      throw new Error('Invalid site data: missing htmlContent');
    }

    return data;
  } catch (error) {
    console.error('Error fetching public site:', error);
    throw error;
  }
};
