// File: apps/web/src/app/landing-page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Efek untuk memantau scroll dan menampilkan tombol
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-poppins bg-[#0B1220] text-white"> {/* Hardcoded background color from your config */}
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0B1220] bg-opacity-90 backdrop-blur-sm shadow-lg py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="#" className="text-2xl font-bold text-[#0EA5E9] font-poppins">lamman</Link>
          <div className="hidden md:flex space-x-8">
            <Link href="#benefits" className="text-white hover:text-[#0EA5E9] transition-colors duration-300">Manfaat</Link>
            <Link href="#features" className="text-white hover:text-[#0EA5E9] transition-colors duration-300">Fitur</Link>
            <Link href="#testimonials" className="text-white hover:text-[#0EA5E9] transition-colors duration-300">Testimoni</Link>
            <Link href="#pricing" className="text-white hover:text-[#0EA5E9] transition-colors duration-300">Harga</Link>
            <Link href="#faq" className="text-white hover:text-[#0EA5E9] transition-colors duration-300">FAQ</Link>
          </div>
          {/* Link ke Auth (Login/Register) */}
          <Link href="/auth" className="bg-[#0EA5E9] text-white px-6 py-2 rounded-full font-semibold hover:bg-sky-600 transition-colors duration-300 hidden md:block">
            Coba Gratis
          </Link>
          
          {/* Mobile Menu Button (Placeholder) */}
          <button className="md:hidden text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-gray-700" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-montserrat leading-tight mb-6 text-white">
            Bikin Landing Page Profesional dalam Hitungan Menit.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Lupakan proses berhari-hari dan biaya mahal. Lamman AI otomatisasi copy dan HTML landing page Anda, siap tayang dalam hitungan menit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <Link href="/auth" className="bg-[#0EA5E9] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-sky-600 transition-colors duration-300 shadow-lg">
              Coba Lamman AI Gratis
            </Link>
            <Link href="#features" className="border border-gray-600 text-gray-200 px-8 py-3 rounded-full text-lg font-semibold hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors duration-300">
              Lihat Contoh Landing Page
            </Link>
          </div>
          <ul className="flex flex-col sm:flex-row justify-center items-center gap-x-8 gap-y-2 text-gray-300 text-base md:text-lg mb-12">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              Landing Page Profesional, Tanpa Coding
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              Konten Persuasif Otomatis
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              Hemat Waktu & Biaya Hingga 90%
            </li>
          </ul>
          <p className="text-sm text-gray-400">
            Dipercaya oleh ratusan UMKM dan Marketer di Indonesia.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-24 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 text-white">Manfaat Menggunakan Lamman AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              title="Rilis Landing Page Lebih Cepat" 
              desc="Tidak perlu lagi menunggu berminggu-minggu. Dengan Lamman AI, landing page Anda siap tayang dalam hitungan menit, mempercepat kampanye marketing Anda." 
            />
            <BenefitCard 
              title="Pangkas Biaya Pengembangan" 
              desc="Lupakan biaya desainer dan copywriter yang mahal. Lamman AI melakukan semuanya secara otomatis, menghemat anggaran Anda untuk hal lain yang lebih penting." 
            />
            <BenefitCard 
              title="Landing Page yang Menjual" 
              desc="Dapatkan copy yang persuasif dan struktur yang teruji untuk konversi tinggi. Lamman AI dirancang untuk membantu Anda mengubah pengunjung menjadi pelanggan." 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 text-white">Fitur Unggulan Lamman AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Features Cards can be refactored similar to BenefitCard if needed, but keeping inline for brevity */}
             <FeatureCard title="Generasi Copy Otomatis" desc="Cukup masukkan detail produk Anda, Lamman AI akan menghasilkan teks persuasif yang terstruktur untuk headline, body copy, hingga CTA." />
             <FeatureCard title="Template Modern & Responsif" desc="Pilih dari berbagai template profesional yang dioptimalkan untuk mobile dan desktop, memastikan tampilan sempurna di semua perangkat." />
             <FeatureCard title="Ekspor HTML Instan" desc="Dapatkan kode HTML siap pakai dalam sekejap. Tinggal copy-paste ke server atau platform hosting Anda, tanpa perlu konfigurasi rumit." />
             <FeatureCard title="Struktur SEO-Friendly" desc="Landing page yang dihasilkan sudah dioptimalkan dengan struktur dasar SEO, membantu produk Anda ditemukan lebih mudah di mesin pencari." />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 text-white">Apa Kata Mereka Tentang Lamman AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Dulu bikin landing page butuh seminggu dan mahal. Sekarang, pakai Lamman AI, 15 menit beres! Penjualan online langsung naik."
              name="Andi Wijaya"
              role="Pemilik Kedai Kopi 'Kopi Senja'"
              initial="A"
              color="bg-[#0EA5E9]"
            />
            <TestimonialCard 
              quote="Lamman AI ini game changer. Saya bisa bikin banyak landing page untuk klien dalam waktu singkat, kualitasnya juga profesional. Klien senang, saya juga."
              name="Sarah Lim"
              role="Digital Marketer Freelance"
              initial="S"
              color="bg-[#F59E0B]"
            />
            <TestimonialCard 
              quote="Sebagai UMKM, efisiensi itu kunci. Lamman AI bantu kami punya landing page keren tanpa pusing mikir coding atau desain. Sangat direkomendasikan!"
              name="Budi Santoso"
              role="Founder 'Gadget Pintar'"
              initial="B"
              color="bg-[#0EA5E9]"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 text-white">Pilih Paket yang Tepat Untuk Anda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-bold font-montserrat mb-4 text-[#0EA5E9]">Starter</h3>
              <p className="text-4xl font-bold text-white mb-6">Rp 99.000<span className="text-lg text-gray-400">/bulan</span></p>
              <ul className="space-y-3 mb-8 flex-grow">
                <PricingItem text="1 Landing Page per bulan" />
                <PricingItem text="Generasi Copy AI" />
                <PricingItem text="Template Dasar" />
                <PricingItem text="Ekspor HTML" />
              </ul>
              <Link href="/auth" className="bg-[#0EA5E9] text-white px-6 py-3 rounded-full font-semibold text-center hover:bg-sky-600 transition-colors duration-300 mt-auto">Pilih Paket Starter</Link>
            </div>

            {/* Pro Plan */}
            <div className="relative bg-gray-700 p-8 rounded-lg shadow-2xl border-2 border-[#0EA5E9] flex flex-col transform scale-105 z-10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-[#0B1220] text-xs font-bold px-3 py-1 rounded-full uppercase">Paling Populer</span>
              <h3 className="text-2xl font-bold font-montserrat mb-4 text-[#F59E0B]">Pro</h3>
              <p className="text-4xl font-bold text-white mb-6">Rp 249.000<span className="text-lg text-gray-400">/bulan</span></p>
              <ul className="space-y-3 mb-8 flex-grow">
                <PricingItem text="5 Landing Page per bulan" />
                <PricingItem text="Generasi Copy AI Lanjutan" />
                <PricingItem text="Akses Semua Template Premium" />
                <PricingItem text="Ekspor HTML" />
                <PricingItem text="Integrasi Pixel & Analitik" />
              </ul>
              <Link href="/auth" className="bg-[#F59E0B] text-[#0B1220] px-6 py-3 rounded-full font-semibold text-center hover:bg-amber-600 transition-colors duration-300 mt-auto">Pilih Paket Pro</Link>
            </div>

            {/* Business Plan */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 flex flex-col">
              <h3 className="text-2xl font-bold font-montserrat mb-4 text-[#0EA5E9]">Business</h3>
              <p className="text-4xl font-bold text-white mb-6">Rp 499.000<span className="text-lg text-gray-400">/bulan</span></p>
              <ul className="space-y-3 mb-8 flex-grow">
                <PricingItem text="Unlimited Landing Page" />
                <PricingItem text="Generasi Copy AI Lanjutan" />
                <PricingItem text="Akses Semua Template Premium" />
                <PricingItem text="Ekspor HTML" />
                <PricingItem text="Integrasi Pixel & Analitik" />
                <PricingItem text="Dukungan Prioritas" />
              </ul>
              <Link href="/auth" className="bg-[#0EA5E9] text-white px-6 py-3 rounded-full font-semibold text-center hover:bg-sky-600 transition-colors duration-300 mt-auto">Pilih Paket Business</Link>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-10">Harga belum termasuk PPN. Batalkan kapan saja.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-center mb-12 text-white">Pertanyaan yang Sering Diajukan</h2>
          <div className="space-y-6">
            <FaqItem question="Apa itu Lamman AI?" answer="Lamman AI adalah platform berbasis kecerdasan buatan yang membantu Anda membuat landing page profesional lengkap dengan copy dan kode HTML dalam hitungan menit, tanpa perlu coding atau desain." />
            <FaqItem question="Siapa yang cocok menggunakan Lamman AI?" answer="Lamman AI dirancang untuk UMKM, startup, marketer, dan siapa saja yang membutuhkan landing page cepat, efektif, dan hemat biaya untuk kampanye digital mereka." />
            <FaqItem question="Apakah saya perlu skill coding untuk menggunakan Lamman AI?" answer="Tidak sama sekali. Lamman AI mengotomatiskan seluruh proses pembuatan landing page, dari penulisan copy hingga generasi kode HTML. Anda hanya perlu mengisi informasi produk Anda." />
            <FaqItem question="Bisakah saya mengkustomisasi desain landing page?" answer="Ya, Anda bisa memilih dari berbagai template yang tersedia dan melakukan penyesuaian dasar. Untuk kustomisasi lebih lanjut, Anda bisa mengedit kode HTML setelah diekspor." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 md:py-24 bg-gray-900 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-lg font-semibold text-[#F59E0B] mb-4">Mulai sekarang dan rasakan efisiensi yang belum pernah ada sebelumnya.</p>
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat leading-tight mb-8 text-white">Siap Ubah Cara Anda Bikin Landing Page?</h2>
          <Link href="/auth" className="bg-[#0EA5E9] text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-sky-600 transition-colors duration-300 shadow-lg transform hover:scale-105 inline-block">
            Coba Lamman AI Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1220] py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p className="mb-4">&copy; 2025 Lamman AI. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <Link href="#" className="hover:text-[#0EA5E9] transition-colors duration-300">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-[#0EA5E9] transition-colors duration-300">Syarat & Ketentuan</Link>
          </div>
        </div>
      </footer>

      {/* Sticky Buttons */}
      <Link href="/auth" className="fixed bottom-6 right-6 bg-[#F59E0B] text-[#0B1220] p-4 rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-300 z-50 animate-bounce">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
      </Link>

      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 left-6 bg-[#0EA5E9] text-white p-4 rounded-full shadow-lg hover:bg-sky-600 transition-colors duration-300 z-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
        </button>
      )}
    </div>
  );
}

// --- Helper Components untuk mengurangi duplikasi ---

function BenefitCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 hover:border-[#0EA5E9] transition-all duration-300">
      <div className="text-[#0EA5E9] mb-4">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      </div>
      <h3 className="text-xl font-semibold font-montserrat mb-3 text-white">{title}</h3>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 hover:border-[#F59E0B] transition-all duration-300">
            <div className="text-[#F59E0B] mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-xl font-semibold font-montserrat mb-3 text-white">{title}</h3>
            <p className="text-gray-300">{desc}</p>
        </div>
    )
}

function TestimonialCard({ quote, name, role, initial, color }: any) {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
      <p className="text-lg italic text-gray-200 mb-6">"{quote}"</p>
      <div className="flex items-center">
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white text-xl font-bold mr-4`}>{initial}</div>
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
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