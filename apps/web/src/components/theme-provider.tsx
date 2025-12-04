// File: apps/web/src/components/theme-provider.tsx

"use client"

import * as React from "react"
// ✅ FIX: Import ThemeProvider dan Type-nya langsung dari package utama
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes" 

// Catatan: Anda tidak perlu lagi mengimpor 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Komponen ini harus didefinisikan secara Client Component ('use client')
  // karena ia mengakses preferensi browser (LocalStorage) untuk tema.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}