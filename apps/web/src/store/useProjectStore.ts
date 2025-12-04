// File: apps/web/src/store/useProjectStore.ts

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Brief, Design, Voice, Layout, LandingCopy } from '@repo/types';

interface ProjectState {
  // State Data
  step: number;
  brief: Brief;
  design: Design;
  voice: Voice;
  layout: Layout;
  copy: LandingCopy | null;
  html_output: string | null;

  // Actions (Fungsi Pengubah State)
  setStep: (step: number) => void;
  updateBrief: (data: Partial<Brief>) => void;
  updateDesign: (data: Partial<Design>) => void;
  updateVoice: (data: Partial<Voice>) => void;
  updateLayout: (data: Partial<Layout>) => void;
  setCopy: (data: LandingCopy) => void;
  setHtmlOutput: (html: string) => void;
  resetProject: () => void;
}

// --- Default Values (Nilai Awal) ---

const initialBrief: Brief = {
  product_name: '',
  one_liner: '',
  audience: '',
  problem: '',
  solution: '',
  offer: '',
  cta: 'Coba Sekarang',
  languages: ['id'],
  differentiator: ''
};

const initialVoice: Voice = {
  archetype: 'Pragmatic Expert',
  tone: ['tegas', 'ringkas'],
  reading_level: 'menengah',
  power_words: true,
  jargon_free: true,
  use_statistics: true,
  conversational: true,
};

const initialDesign: Design = {
  primary: '#0EA5E9', // Sky Blue
  accent: '#F59E0B',  // Amber
  bg: '#0B1220',      // Deep Dark
  font_heading: 'Montserrat',
  font_body: 'Poppins',
  tone_visual: 'modern-minimal',
};

const initialLayout: Layout = {
  order: ['navbar', 'hero', 'benefits', 'features', 'testimonials', 'pricing', 'faq', 'cta', 'footer'],
  container: 'max-w-7xl',
  hero_style: 'dark',
  feature_grid: 3,
  testimonial_style: 'cards',
  spacing: 'normal',
  cta_style: 'solid',
  sticky_navbar: true,
  sticky_cta: true,
  scroll_to_top: true,
};

// --- Store Creation ---

export const useProjectStore = create<ProjectState>()(
  devtools(
    persist(
      (set) => ({
        // Initial State
        step: 0,
        brief: initialBrief,
        voice: initialVoice,
        design: initialDesign,
        layout: initialLayout,
        copy: null,
        html_output: null,

        // Actions Implementation
        setStep: (step) => set({ step }),
        
        // Update Partial Data (Menggabungkan data lama dengan yang baru)
        updateBrief: (data) => set((state) => ({ brief: { ...state.brief, ...data } })),
        updateVoice: (data) => set((state) => ({ voice: { ...state.voice, ...data } })),
        updateDesign: (data) => set((state) => ({ design: { ...state.design, ...data } })),
        updateLayout: (data) => set((state) => ({ layout: { ...state.layout, ...data } })),
        
        // Set Full Data
        setCopy: (data) => set({ copy: data }),
        setHtmlOutput: (html) => set({ html_output: html }),
        
        // Reset All (Kembali ke awal)
        resetProject: () => set({
          step: 0,
          brief: initialBrief,
          voice: initialVoice,
          design: initialDesign,
          layout: initialLayout,
          copy: null,
          html_output: null
        }),
      }),
      {
        name: 'lamman-project-storage', // Key LocalStorage agar data tidak hilang saat refresh
      }
    )
  )
);