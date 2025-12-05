// File: apps/web/src/app/landing-page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
// Hapus useAuthStore jika sudah di-import dari page.tsx dan dikirim sebagai prop
// Kita asumsikan Button dan helper components (seperti FaqItem, dll) sudah diimport/didefinisikan di sini.

interface LandingPageProps {
  isAuthenticated: boolean; // ✅ Menerima prop status login
}

// --- Helper Components (Asumsi ini ada di file Anda) ---
function BenefitCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 hover:border-[#0EA5E9] transition-all duration-300">
            <div className="text-[#0EA5E9] mb-4">⚡</div>
            <h3 className="text-xl font-semibold font-montserrat mb-3 text-white">{title}</h3>
            <p className="text-gray-300">{desc}</p>
        </div>
    );
}

function PricingItem({ text }: { text: string }) {
    return (
        <li className="flex items-center text-gray-300">
            <svg className="w-5 h-5 mr-2 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            {text}
        </li>
    );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
            <details className="group">
                <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-white font-montserrat">
                    {question}
                    <span className="ml-auto transition-transform duration-300 group-open:rotate-180">
                        <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                </summary>
                <p className="mt-4 text-gray-300">{answer}</p>
            </details>
        </div>
    );
}
// --- Akhir Helper Components ---


export default function LandingPage({ isAuthenticated }: LandingPageProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // ... (Scroll logic remains the same)
    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="font-poppins bg-[#0B1220] text-white">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0B1220] bg-opacity-90 backdrop-blur-sm shadow-lg py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="#" className="text-2xl font-bold text-[#0EA5E9] font-montserrat">Lamman AI</Link>
          <nav>
            {isAuthenticated ? (
               <Link href="/dashboard">
                  <Button variant="default" className="bg-[#0EA5E9] hover:bg-sky-600">Buka Dashboard</Button>
               </Link>
            ) : (
               <div className="space-x-4">
                  <Link href="/auth">
                    <Button variant="ghost" className="hover:bg-gray-800 text-white">Masuk</Button>
                  </Link>
                  <Link href="/auth">
                    <Button className="bg-[#0EA5E9] hover:bg-sky-600">Daftar Gratis</Button>
                  </Link>
               </div>
            )}
          </nav>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 md:py-32 text-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-montserrat leading-tight mb-6 text-white">
            Bikin Landing Page Profesional dalam Hitungan Menit.
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            {/* ✅ CTA UTAMA: Mengarahkan ke Dashboard jika sudah login */}
            <Link href={isAuthenticated ? "/dashboard" : "/auth"} 
                  className="bg-[#0EA5E9] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-sky-600 transition-colors duration-300 shadow-lg">
              {isAuthenticated ? "Lanjut ke Project Anda →" : "Coba Lamman AI Gratis →"}
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section (disederhanakan) */}
      <section id="benefits" className="py-16 md:py-24 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 text-white">Manfaat Menggunakan Lamman AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Menggunakan Helper Card */}
            <BenefitCard title="Rilis Cepat" desc="Landing page Anda siap tayang dalam hitungan menit." />
            <BenefitCard title="Hemat Biaya" desc="Pangkas biaya desainer dan copywriter yang mahal." />
            <BenefitCard title="Konversi Tinggi" desc="Dapatkan copy dan struktur yang teruji untuk konversi tinggi." />
          </div>
        </div>
      </section>

      {/* Pricing Section (Contoh) */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold font-montserrat text-center mb-12 text-white">Pilih Paket</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pro Plan Example */}
            <div className="relative bg-gray-700 p-8 rounded-lg shadow-2xl border-2 border-[#0EA5E9] flex flex-col transform scale-105">
              <h3 className="text-2xl font-bold font-montserrat mb-4 text-[#F59E0B]">Pro</h3>
              <p className="text-4xl font-bold text-white mb-6">Rp 249.000<span className="text-lg text-gray-400">/bulan</span></p>
              <ul className="space-y-3 mb-8 flex-grow">
                <PricingItem text="5 Landing Page per bulan" />
                <PricingItem text="Akses Semua Template Premium" />
                <PricingItem text="Integrasi Pixel & Analitik" />
              </ul>
              <Link href={isAuthenticated ? "/dashboard" : "/auth"} 
                    className="bg-[#F59E0B] text-[#0B1220] px-6 py-3 rounded-full font-semibold text-center mt-auto">
                {isAuthenticated ? "Lanjut ke Dashboard" : "Pilih Paket Pro"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 left-6 bg-[#0EA5E9] text-white p-4 rounded-full shadow-lg z-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
        </button>
      )}

      {/* Footer */}
      <footer className="bg-[#0B1220] py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p className="mb-4">&copy; 2025 Lamman AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}