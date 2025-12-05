// File: apps/web/src/lib/ApiAgent.ts

import axios from 'axios';
import { Brief, Design, Voice, LandingCopy, Layout } from '@repo/types';

// 1. AMBIL BASE URL & BERSIHKAN (Hapus trailing slash jika ada)
const rawBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
const API_BASE_URL = rawBaseUrl.replace(/\/$/, ''); // Regex untuk hapus '/' di akhir

// 2. RAKIT URL API AI
const API_URL = `${API_BASE_URL}/ai`;

console.log("🚀 API Configured to:", API_URL); // Debugging Log

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

// 3. Generate Copy
export const generateCopyAgent = async (payload: GenerateCopyPayload): Promise<LandingCopy> => {
    try {
        console.log(`Agent: POST request to ${API_URL}/generate-copy`);
        
        const response = await axios.post<LandingCopy>(
            `${API_URL}/generate-copy`, 
            payload
        );
        
        return response.data;
    } catch (error) {
        console.error('Agent Error Copy:', error);
        throw error;
    }
};

// 4. Generate HTML
export const generateHtmlAgent = async (payload: GenerateHtmlPayload): Promise<string> => {
    try {
        console.log(`Agent: POST request to ${API_URL}/generate-html`);
        
        const response = await axios.post<{ html: string }>( 
            `${API_URL}/generate-html`, 
            payload
        );
        
        return response.data.html; 
    } catch (error) {
        console.error('Agent Error HTML:', error);
        throw error;
    }
};