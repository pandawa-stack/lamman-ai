import axios from 'axios';
import { Brief, Design, Voice, LandingCopy, Layout } from '@repo/types';

// ✅ STANDARDISASI URL
const rawBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api-production-042c.up.railway.app';
const API_BASE_URL = rawBaseUrl.replace(/\/$/, ''); // Hapus slash di akhir jika ada
const API_URL = `${API_BASE_URL}/ai`; // Endpoint khusus AI

interface GenerateCopyPayload {
    brief: Brief;
    voice: Voice;
}

interface GenerateHtmlPayload {
    brief: Brief;
    design: Design;
    voice: Voice;
    copy: LandingCopy;
    layout: Layout;
}

export const generateCopyAgent = async (payload: GenerateCopyPayload): Promise<LandingCopy> => {
    try {
        console.log(`Agent: POST request to ${API_URL}/generate-copy`);
        const response = await axios.post<LandingCopy>(`${API_URL}/generate-copy`, payload);
        return response.data;
    } catch (error) {
        console.error('Agent Error Copy:', error);
        throw error;
    }
};

export const generateHtmlAgent = async (payload: GenerateHtmlPayload): Promise<string> => {
    try {
        console.log(`Agent: POST request to ${API_URL}/generate-html`);
        const response = await axios.post<{ html: string }>(`${API_URL}/generate-html`, payload);
        return response.data.html; 
    } catch (error) {
        console.error('Agent Error HTML:', error);
        throw error;
    }
};