'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Poppins, Inter } from 'next/font/google';
import { 
  Menu, 
  X, 
  CheckCircle, 
  ChevronDown, 
  ArrowUp, 
  Zap, 
  Clock, 
  Layout, 
  Rocket, 
  CreditCard,
  Settings,
  BarChart3,
  Globe,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

// --- CONFIGURATION FONTS ---
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
});

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

export default function LandingPage() {
  // --- STATE MANAGEMENT ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // --- EFFECT: SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- HANDLERS ---
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // --- DATA: BENEFITS ---
  const benefits = [
    {
      title: "Loading Kilat",
      desc: "Website berat membunuh konversi. Lamman menghasilkan page statis ringan agar pengunjung tidak kabur.",
      icon: <Zap className="w-8 h-8 text-[#FF9E1B]" />
    },
    {
      title: "Publikasi Instan",
      desc: "Lupakan hosting & SSL. Klik publish, page langsung live di subdomain Lamman atau domain sendiri.",
      icon: <Rocket className="w-8 h-8 text-[#FF9E1B]" />
    },
    {
      title: "Hemat Biaya",
      desc: "Solusi efektif dengan biaya jauh lebih terjangkau dibanding tools luar seperti ClickFunnels.",
      icon: <CreditCard className="w-8 h-8 text-[#FF9E1B]" />
    },
    {
      title: "Kontrol Penuh",
      desc: "Edit headline atau gambar sendiri dalam hitungan detik. Tidak perlu menunggu developer.",
      icon: <Settings className="w-8 h-8 text-[#FF9E1B]" />
    },
    {
      title: "Desain Siap Jual",
      desc: "Pre-built blocks dengan struktur copywriting yang sudah dioptimasi untuk konversi.",
      icon: <Layout className="w-8 h-8 text-[#FF9E1B]" />
    },
    // Menambahkan item ke-6 agar grid seimbang
    {
      title: "Mobile Friendly",
      desc: "Tampilan otomatis menyesuaikan layar HP, sumber traffic terbesar iklan saat ini.",
      icon: <Globe className="w-8 h-8 text-[#FF9E1B]" />
    }
  ];

  // --- DATA: FAQ ---
  const faqs = [
    {
      q: "Apa itu Lamman?",
      a: "Lamman adalah generator landing page instan yang memungkinkan Anda membuat halaman penjualan berkecepatan tinggi tanpa coding."
    },
    {
      q: "Seberapa cepat landing page Lamman?",
      a: "Sangat cepat. Kami menggunakan teknologi Static Site Generation (SSG) yang dioptimasi untuk Core Web Vitals (skor hijau di Google)."
    },
    {
      q: "Apakah perlu skill coding?",
      a: "Tidak sama sekali. Semua dilakukan dengan form sederhana dan pilihan blok yang mudah dimengerti."
    },
    {
      q: "Bisakah pakai domain sendiri?",
      a: "Bisa! Anda bisa menggunakan subdomain gratis .lamman.link atau menghubungkan custom domain (misal: promo.bisnisanda.com)."
    },
    {
      q: "Apakah cocok untuk Facebook Ads?",
      a: "Sangat cocok. Loading cepat dan struktur yang fokus pada CTA akan membantu meningkatkan ROI iklan Anda."
    }
  ];

  return (
    <div className={`${poppins.variable} ${inter.variable} font-sans bg-[#F8FAFC] text-[#0C1427] scroll-smooth`}>
      
      {/* --- NAVBAR --- */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-poppins font-bold text-[#0C1427]">
            lamman<span className="text-[#FF9E1B]">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {['Manfaat', 'Fitur', 'Testimoni', 'Harga', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-[#FF9E1B] font-medium transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth" className="text-sm font-semibold hover:text-[#00AEEF]">
                Masuk
            </Link>
            <Link href="/auth" className="bg-[#FF9E1B] text-white font-bold py-2.5 px-6 rounded-full hover:bg-[#e58a0f] transition shadow-lg shadow-orange-200">
              Buat Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#0C1427]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {['Manfaat', 'Fitur', 'Testimoni', 'Harga', 'FAQ'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#FF9E1B]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                 <Link 
                    href="/auth" 
                    className="block w-full text-center bg-[#FF9E1B] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#e58a0f]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                  Buat Landing Page Gratis
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* --- HERO SECTION --- */}
        <section id="hero" className="bg-[#0C1427] text-white py-20 md:py-32 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00AEEF] rounded-full opacity-10 blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF9E1B] rounded-full opacity-5 blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                <div className="md:w-1/2 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-6 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-[#FF9E1B]"></span>
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-200">New: AI Copy & Landing Page Generator</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-extrabold leading-tight mb-6">
                        Ubah Iklan Jadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-white">Penjualan Nyata</span>.
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 text-gray-300 leading-relaxed">
                        Generator landing page instan untuk marketer yang butuh hasil cepat. Tanpa setup server, tanpa coding, loading &lt; 1 detik.
                    </p>
                    
                    <ul className="text-base mb-10 space-y-4 text-left mx-auto md:mx-0 max-w-md text-gray-300">
                        {[
                            "Publikasi Instan (Zero Config)",
                            "Performa Blazing Fast (Core Web Vitals Ready)",
                            "Blok Konversi Tinggi (Sales Optimized)",
                            "Kontrol Penuh Tanpa Developer"
                        ].map((feat, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-[#FF9E1B] shrink-0" />
                                <span>{feat}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                        <Link href="/auth" className="bg-[#FF9E1B] text-white font-bold py-4 px-8 rounded-lg hover:bg-[#e58a0f] transition shadow-xl shadow-orange-900/20 text-lg flex items-center justify-center gap-2">
                            <Rocket size={20} /> Buat Gratis Sekarang
                        </Link>
                        <a href="#demo" className="bg-white/10 border border-white/20 text-white font-bold py-4 px-8 rounded-lg hover:bg-white/20 transition backdrop-blur-sm text-lg text-center">
                            Lihat Demo
                        </a>
                    </div>
                </div>
                
                {/* Hero Image / Illustration */}
                <div className="md:w-1/2 flex justify-center relative">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900 aspect-video w-full max-w-lg group">
                        {/* Placeholder for Dashboard UI */}
                         <div className="absolute inset-0 flex items-center justify-center bg-[#0B1121]">
                            <div className="text-center">
                                <p className="text-[#00AEEF] font-mono text-sm mb-2">dashboard_preview.png</p>
                                <div className="w-16 h-16 border-4 border-[#00AEEF] border-t-transparent rounded-full animate-spin mx-auto opacity-50"></div>
                            </div>
                        </div>
                        {/* Replace src with actual image later */}
                         <img 
                            src="https://placehold.co/800x600/0f172a/FFF?text=Lamman+Dashboard+UI" 
                            alt="Lamman Dashboard" 
                            className="relative z-10 w-full h-full object-cover transform transition duration-700 hover:scale-105 opacity-90 hover:opacity-100"
                        />
                    </div>
                     {/* Decorative Elements behind image */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00AEEF]/20 blur-3xl rounded-full"></div>
                </div>
            </div>
        </section>

        {/* --- BENEFITS SECTION --- */}
        <section id="benefits" className="py-20 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-16">
                    <span className="text-[#00AEEF] font-bold tracking-wider uppercase text-sm">Mengapa Lamman?</span>
                    <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0C1427] mt-2">
                        Solusi Terbaik untuk Bisnis Anda
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 text-left group">
                            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-poppins font-semibold text-[#0C1427] mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- FEATURES GRID (More Technical) --- */}
        <section id="features" className="py-20 bg-[#F1F5F9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                     <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0C1427]">
                        Fitur yang Fokus pada Konversi
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Kami membuang semua fitur rumit yang tidak Anda butuhkan, dan menyempurnakan fitur yang menghasilkan uang.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-8 rounded-xl border border-gray-200 flex gap-6 items-start">
                         <div className="bg-blue-50 p-3 rounded-lg shrink-0">
                            <Clock className="w-6 h-6 text-[#00AEEF]" />
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-[#0C1427] mb-2">Zero-Config Publishing</h3>
                             <p className="text-gray-600 text-sm">Tidak perlu setting DNS rumit atau install plugin caching. Sistem kami mengurus performa server 100%.</p>
                         </div>
                    </div>

                     {/* Feature 2 */}
                     <div className="bg-white p-8 rounded-xl border border-gray-200 flex gap-6 items-start">
                         <div className="bg-blue-50 p-3 rounded-lg shrink-0">
                            <BarChart3 className="w-6 h-6 text-[#00AEEF]" />
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-[#0C1427] mb-2">Built-in Simple Analytics</h3>
                             <p className="text-gray-600 text-sm">Lihat jumlah pengunjung dan klik tombol CTA (Call to Action) langsung di dashboard tanpa setup Google Analytics.</p>
                         </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-8 rounded-xl border border-gray-200 flex gap-6 items-start">
                         <div className="bg-blue-50 p-3 rounded-lg shrink-0">
                            <MessageCircle className="w-6 h-6 text-[#00AEEF]" />
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-[#0C1427] mb-2">Integrasi WhatsApp & Email</h3>
                             <p className="text-gray-600 text-sm">Hubungkan tombol beli langsung ke WhatsApp API atau form email marketing favorit Anda.</p>
                         </div>
                    </div>

                     {/* Feature 4 */}
                     <div className="bg-white p-8 rounded-xl border border-gray-200 flex gap-6 items-start">
                         <div className="bg-blue-50 p-3 rounded-lg shrink-0">
                            <ShieldCheck className="w-6 h-6 text-[#00AEEF]" />
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-[#0C1427] mb-2">Auto SSL & Security</h3>
                             <p className="text-gray-600 text-sm">Semua landing page otomatis mendapatkan sertifikat SSL (HTTPS) gratis agar aman dan tepercaya.</p>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section id="testimonials" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0C1427] mb-12">
                    Kata Mereka Tentang Lamman
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {[
                        { name: "Sarah Wijaya", role: "Digital Agency", text: "Sebelum Lamman, kami butuh berhari-hari untuk satu landing page. Sekarang cuma butuh menit! Konversi iklan naik drastis.", initial: "SW" },
                        { name: "Budi Santoso", role: "Owner Kopi Nikmat", text: "Saya gaptek coding. Lamman solusinya! Mudah dipakai, hasilnya profesional, dan penjualan naik berkat page cepat.", initial: "BS" },
                        { name: "Kevin Lee", role: "Affiliate Marketer", text: "Kecepatan adalah segalanya di affiliate. Lamman memberikan page super ringan. ROI kampanye saya membaik.", initial: "KL" }
                     ].map((t, i) => (
                        <div key={i} className="bg-[#F8FAFC] p-8 rounded-xl border border-gray-100 relative">
                            <div className="w-16 h-16 bg-[#0C1427] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border-4 border-white shadow-md">
                                {t.initial}
                            </div>
                            <p className="text-gray-600 italic mb-6">"{t.text}"</p>
                            <h4 className="font-bold text-[#0C1427]">{t.name}</h4>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t.role}</p>
                        </div>
                     ))}
                </div>
            </div>
        </section>

        {/* --- PRICING --- */}
        <section id="pricing" className="py-20 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0C1427] mb-4">
                    Investasi Cerdas untuk Bisnis
                </h2>
                <p className="text-gray-500 mb-12">Mulai gratis, upgrade saat bisnis Anda tumbuh.</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Starter */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-xl font-bold text-[#0C1427] mb-2">Starter</h3>
                        <p className="text-4xl font-extrabold text-[#0C1427] mb-6">Gratis</p>
                        <ul className="space-y-4 text-left text-sm text-gray-600 mb-8">
                            {['1 Landing Page', 'Subdomain .lamman.link', 'Blok Dasar', 'Analytics Sederhana'].map(f => (
                                <li key={f} className="flex gap-2"><CheckCircle size={18} className="text-green-500" /> {f}</li>
                            ))}
                        </ul>
                        <Link href="/auth" className="block w-full py-3 rounded-lg border-2 border-[#0C1427] text-[#0C1427] font-bold hover:bg-gray-50 transition">
                            Mulai Gratis
                        </Link>
                    </div>

                    {/* Pro (Highlighted) */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#FF9E1B] relative transform lg:-translate-y-4">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF9E1B] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Paling Laris
                        </div>
                        <h3 className="text-xl font-bold text-[#0C1427] mb-2">Pro</h3>
                        <p className="text-4xl font-extrabold text-[#FF9E1B] mb-1">Rp 199rb</p>
                        <p className="text-gray-400 text-sm mb-6">/bulan</p>
                        <ul className="space-y-4 text-left text-sm text-gray-600 mb-8">
                             {['Unlimited Landing Page', 'Custom Domain Sendiri', 'Semua Blok Premium', 'Analytics Lanjutan', 'Prioritas Support'].map(f => (
                                <li key={f} className="flex gap-2"><CheckCircle size={18} className="text-[#FF9E1B]" /> {f}</li>
                            ))}
                        </ul>
                        <Link href="/auth" className="block w-full py-3 rounded-lg bg-[#FF9E1B] text-white font-bold hover:bg-[#e58a0f] transition shadow-lg shadow-orange-200">
                            Pilih Pro
                        </Link>
                    </div>

                    {/* Business */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        <h3 className="text-xl font-bold text-[#0C1427] mb-2">Business</h3>
                        <p className="text-4xl font-extrabold text-[#0C1427] mb-1">Rp 499rb</p>
                        <p className="text-gray-400 text-sm mb-6">/bulan</p>
                        <ul className="space-y-4 text-left text-sm text-gray-600 mb-8">
                             {['Semua Fitur Pro', 'Akses Tim (3 User)', 'Integrasi Google Sheets', 'Konsultasi Strategi'].map(f => (
                                <li key={f} className="flex gap-2"><CheckCircle size={18} className="text-green-500" /> {f}</li>
                            ))}
                        </ul>
                        <Link href="/auth" className="block w-full py-3 rounded-lg border-2 border-[#0C1427] text-[#0C1427] font-bold hover:bg-gray-50 transition">
                            Pilih Business
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* --- FAQ --- */}
        <section id="faq" className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-poppins font-bold text-[#0C1427] text-center mb-10">
                    Pertanyaan Umum
                </h2>
                <div className="space-y-4">
                    {faqs.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button 
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center p-5 text-left font-semibold text-[#0C1427] bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <span>{item.q}</span>
                                <ChevronDown 
                                    className={`w-5 h-5 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} 
                                />
                            </button>
                            <div className={`p-5 text-gray-600 bg-white border-t border-gray-100 ${openFaqIndex === index ? 'block' : 'hidden'}`}>
                                {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section id="cta-section" className="py-20 bg-[#FF9E1B] text-white text-center relative overflow-hidden">
             {/* Abstract Noise Texture/Pattern Overlay */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
             
             <div className="max-w-4xl mx-auto px-4 relative z-10">
                <h2 className="text-3xl sm:text-5xl font-poppins font-bold leading-tight mb-6">
                    Jangan Biarkan Iklan Anda Boncos.
                </h2>
                <p className="text-lg sm:text-xl mb-10 text-white/90">
                    Mulai buat landing page yang cepat, cantik, dan menghasilkan penjualan hari ini.
                </p>
                <Link href="/auth" className="inline-block bg-[#0C1427] text-white font-bold py-4 px-10 rounded-full hover:bg-gray-900 transition shadow-xl text-xl">
                    Coba Lamman Gratis
                </Link>
                <p className="mt-4 text-sm text-white/70">Tanpa kartu kredit. Batal kapan saja.</p>
             </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0C1427] text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
                <span className="text-2xl font-poppins font-bold">lamman<span className="text-[#FF9E1B]">.</span></span>
                <p className="text-gray-400 text-sm mt-2">© 2025 Lamman Platform. All rights reserved.</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-[#FF9E1B]">Privacy Policy</a>
                <a href="#" className="hover:text-[#FF9E1B]">Terms of Service</a>
                <a href="#" className="hover:text-[#FF9E1B]">Support</a>
            </div>
        </div>
      </footer>

      {/* --- FLOATING ELEMENTS --- */}
      
      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button 
            onClick={scrollToTop}
            className="fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-[#0C1427] text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition z-40 animate-in fade-in slide-in-from-bottom-4"
        >
            <ArrowUp size={24} />
        </button>
      )}

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 md:hidden z-40 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
           <div className="text-sm">
               <p className="font-bold text-[#0C1427]">Mulai Cuan?</p>
               <p className="text-xs text-gray-500">Gratis selamanya.</p>
           </div>
           <Link href="/auth" className="bg-[#FF9E1B] text-white font-bold py-2 px-6 rounded-full text-sm shadow-md">
               Buat Akun
           </Link>
      </div>

    </div>
  );
}