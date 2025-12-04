// File: apps/web/src/lib/ApiAgent.ts

import axios from 'axios';
import { Brief, Design, Voice, LandingCopy, Layout } from '@repo/types'; // Import dari packages/types

// URL Backend NestJS
// GANTI: const API_URL = 'http://localhost:3001/ai';
// JADI:
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
const API_URL = `${API_BASE_URL}/ai`;

// --- Interface untuk data yang akan dikirim ke Backend ---
interface GenerateCopyPayload {
    brief: Brief;
    voice: Voice;
}

interface GenerateHtmlPayload {
    brief: Brief;
    design: Design;
    voice: Voice;
    copy: LandingCopy;
    layout: Layout; // Layout adalah string di store
}

// 1. Panggilan API untuk GENERATE COPY (Teks)
export const generateCopyAgent = async (payload: GenerateCopyPayload): Promise<LandingCopy> => {
    try {
        console.log('Agent: Sending generate-copy request to Backend...');
        
        // Kita expect response berupa JSON objek LandingCopy
        const response = await axios.post<LandingCopy>(
            `${API_URL}/generate-copy`, 
            payload
        );
        
        console.log('Agent: Copy received successfully.');
        return response.data;
    } catch (error) {
        console.error('Agent Error: Failed to generate copy.', error);
        throw error;
    }
};

// 2. Panggilan API untuk GENERATE HTML (Markah Akhir)
export const generateHtmlAgent = async (payload: GenerateHtmlPayload): Promise<string> => {
    try {
        console.log('Agent: Sending generate-html request to Backend...');
        
        // Kita expect response berupa JSON objek { html: "..." }
        const response = await axios.post<{ html: string }>( 
            `${API_URL}/generate-html`, // Endpoint Backend untuk HTML
            payload
        );
        
        console.log('Agent: HTML received successfully.');
        
        // 🚨 FIX: Kita ambil properti 'html' dari objek JSON
        return response.data.html; 
    } catch (error) {
        console.error('Agent Error: Failed to generate HTML.', error);
        throw error;
    }
};