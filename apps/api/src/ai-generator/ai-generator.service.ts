// File: apps/api/src/ai-generator/ai-generator.service.ts

import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { Brief, Design, Layout, LandingCopy, Voice } from '@repo/types';

@Injectable()
export class AiGeneratorService {
  private genAI: GoogleGenerativeAI;
  private modelCopy: GenerativeModel;
  private modelHtml: GenerativeModel;
  private readonly logger = new Logger(AiGeneratorService.name);

  // ✅ UPDATE: Instruksi Tahun di System Prompt
  private readonly SYSTEM_SEED = `
    You are a senior conversion copywriter, UX strategist, and landing page architect.
    Your task is to act as a world-class Tailwind CSS developer when asked for code.
    Always output complete, valid, production-ready results.
    ALWAYS use the current year (${new Date().getFullYear()}) for copyrights and dates.
  `;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    
    if (!apiKey) {
      this.logger.error('GEMINI_API_KEY not found in .env');
      throw new Error('GEMINI_API_KEY is missing');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);

    // ✅ UPDATE: Tetap gunakan gemini-2.5-flash sesuai request
    const MODEL_NAME = 'gemini-2.5-flash'; 

    this.modelCopy = this.genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: this.SYSTEM_SEED,
      generationConfig: {
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    });

    this.modelHtml = this.genAI.getGenerativeModel({
      model: MODEL_NAME, 
      systemInstruction: this.SYSTEM_SEED,
      generationConfig: {
        temperature: 0.3,
      },
    });
  }

  // --- 1. GENERATE COPY ---
  async generateCopy(brief: Brief, voice: Voice): Promise<LandingCopy> {
    try {
      this.logger.log(`🤖 AI: Generating copy for ${brief.product_name} using ${this.modelCopy.model}...`);
      const prompt = this.buildCopyPrompt(brief, voice);
      
      const result = await this.modelCopy.generateContent(prompt);
      const responseText = result.response.text();
      
      const cleanedText = responseText.replace(/```json|```/g, '').trim();
      
      let copyData: LandingCopy;
      try {
          copyData = JSON.parse(cleanedText) as LandingCopy;
      } catch (jsonError) {
          this.logger.error('JSON Parse Failed. Switching to Fallback.', cleanedText);
          return this.generateFallbackCopy(brief);
      }
      
      return this.refineCopy(copyData);

    } catch (error: any) {
      this.logger.warn(`⚠️ AI Error (${error.message}). Switching to Smart Fallback for Copy.`);
      return this.generateFallbackCopy(brief);
    }
  }

  // --- 2. GENERATE HTML ---
  async generateHtml(brief: Brief, design: Design, layout: Layout, copy: LandingCopy, voice: Voice): Promise<string> {
    try {
      this.logger.log(`🤖 AI: Generating HTML for ${brief.product_name} using ${this.modelHtml.model}...`);
      const prompt = this.buildHtmlPrompt(brief, design, layout, copy, voice);
      
      const result = await this.modelHtml.generateContent(prompt);
      let html = result.response.text();

      html = html.replace(/^```html|```$/gm, '').trim();
      
      return html;

    } catch (error: any) {
      this.logger.warn(`⚠️ AI Error (${error.message}). Switching to Smart Fallback for HTML.`);
      return this.generateFallbackHtml(brief, design, layout, copy);
    }
  }

  // --- FALLBACK COPY ---
  private generateFallbackCopy(brief: Brief): LandingCopy {
    return {
      hero: {
        headline: brief.one_liner || `Solusi Terbaik untuk ${brief.product_name}`,
        subheadline: brief.problem || "Kami membantu Anda mengatasi masalah dengan solusi yang tepat dan efisien.",
        bullets: ["Mudah Digunakan", "Hemat Biaya", "Hasil Cepat"],
        primary_cta: brief.cta || "Mulai Sekarang",
        secondary_cta: "Pelajari Lebih Lanjut",
        social_proof: "Dipercaya oleh pengguna."
      },
      benefits: [
        { title: "Solusi Tepat Guna", desc: brief.solution },
        { title: "Efisiensi Tinggi", desc: "Menghemat waktu Anda secara signifikan." },
        { title: "Kualitas Terjamin", desc: brief.differentiator || "Unggul dibandingkan kompetitor." }
      ],
      features: [
        { title: "Fitur Utama", desc: "Fitur dasar yang memastikan produk tetap dapat ditampilkan." },
        { title: "Fitur Pendukung", desc: "Fitur tambahan yang memberikan nilai lebih." },
      ],
      testimonials: [
        { name: "Budi Santoso", role: "Pengguna Awal", quote: "Produk ini sangat membantu pekerjaan saya sehari-hari." },
      ],
      pricing: {
        plans: [
          { name: "Basic", price: "Gratis", items: ["Fitur Dasar", "Support Email"] },
        ],
        note: brief.offer || "Garansi uang kembali 30 hari."
      },
      faq: [
        { q: "Apakah ini cocok untuk pemula?", a: "Ya, dirancang agar mudah digunakan siapa saja." },
      ],
      cta: {
        headline: "Siap untuk Memulai?",
        kicker: "Jangan lewatkan kesempatan ini.",
        button: brief.cta || "Gabung Sekarang"
      }
    };
  }

  // --- FALLBACK HTML (TEMPLATE) ---
  private generateFallbackHtml(brief: Brief, design: Design, layout: Layout, copy: LandingCopy): string {
    const fontHeading = design.font_heading.replace(/\s+/g, '+');
    const fontBody = design.font_body.replace(/\s+/g, '+');
    // ✅ UPDATE: Tahun Dinamis
    const currentYear = new Date().getFullYear();

    return `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brief.product_name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: '${design.primary}',
              accent: '${design.accent}',
              bg: '${design.bg}',
            },
            fontFamily: {
              heading: ['"${design.font_heading}"', 'sans-serif'],
              body: ['"${design.font_body}"', 'sans-serif'],
            }
          }
        }
      }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=${fontHeading}:wght@700;800&family=${fontBody}:wght@400;600&display=swap" rel="stylesheet">
    <style> 
      html, body { margin: 0; padding: 0; min-height: 100%; } 
      body { font-family: 'body', sans-serif; background-color: white; color: #1f2937; }
      h1, h2, h3 { font-family: 'heading', sans-serif; }
    </style>
</head>
<body class="antialiased">
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div class="text-xl font-bold text-primary">${brief.product_name}</div>
            <a href="#cta" class="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition shadow-md">${copy.hero.primary_cta}</a>
        </div>
    </nav>
    <header class="pt-28 pb-24 px-4 text-center text-white" style="background-color: ${design.bg};">
        <div class="max-w-5xl mx-auto">
            <span class="text-accent text-sm font-semibold uppercase tracking-widest mb-4 block">STATUS: FALLBACK MODE</span>
            <h1 class="text-5xl md:text-6xl font-extrabold mb-6 leading-tight" style="font-family: ${design.font_heading}, sans-serif;">${copy.hero.headline}</h1>
            <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">${copy.hero.subheadline}</p>
            <a href="#cta" class="bg-primary px-8 py-3 rounded-xl text-lg font-semibold hover:scale-105 transition shadow-xl shadow-primary/40">${copy.hero.primary_cta}</a>
        </div>
    </header>
    <section class="py-20 px-4 bg-white text-gray-900">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold font-heading text-center mb-12">Fitur Utama</h2>
            <div class="grid md:grid-cols-3 gap-8">
                ${copy.benefits.map(b => `
                <div class="p-6 border-t-4 border-primary rounded-xl shadow-md hover:shadow-lg transition bg-white">
                    <h3 class="text-xl font-bold mb-2 text-primary">${b.title}</h3>
                    <p class="text-gray-600">${b.desc}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    <section id="cta" class="py-24 px-4 text-center bg-primary text-white">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-4xl md:text-5xl font-bold font-heading mb-6">${copy.cta.headline}</h2>
            <a href="#" class="inline-block bg-accent text-gray-900 px-10 py-4 rounded-full text-xl font-bold hover:bg-white transition shadow-lg">${copy.cta.button}</a>
        </div>
    </section>
    <footer class="py-12 text-center text-gray-500 text-sm border-t border-gray-200">
        &copy; ${currentYear} ${brief.product_name}. Generated by Lamman AI.
    </footer>
</body>
</html>
    `;
  }

  // --- PROMPT BUILDERS ---
  private buildCopyPrompt(brief: Brief, voice: Voice): string {
    const toneString = voice.tone.join(', ');
    const schemaStructure = {
        hero: { headline: "string", subheadline: "string", bullets: ["string"], primary_cta: "string", secondary_cta: "string", social_proof: "string" },
        benefits: [{ title: "string", desc: "string" }],
        features: [{ title: "string", desc: "string" }],
        testimonials: [{ name: "string", role: "string", quote: "string" }],
        pricing: { plans: [{ name: "string", price: "string", items: ["string"] }], note: "string" },
        faq: [{ q: "string", a: "string" }],
        cta: { headline: "string", kicker: "string", button: "string" }
    };

    return `
      CONTEXT: Product: ${brief.product_name}, One Liner: ${brief.one_liner}, Audience: ${brief.audience}, Problem: ${brief.problem}, Solution: ${brief.solution}.
      VOICE: Tone: ${toneString}.
      TASK: Create landing page copy in Bahasa Indonesia. Output **ONLY JSON**. No markdown.
      Ensure output matches: ${JSON.stringify(schemaStructure)}
    `;
  }

  private buildHtmlPrompt(brief: Brief, design: Design, layout: Layout, copy: LandingCopy, voice: Voice): string {
    const contentPayload = { brief_summary: brief.one_liner, design, layout, copy };
    return `
      FINAL TASK: BUILD HTML LANDING PAGE.
      TECH STACK: Tailwind CSS via CDN, Google Fonts (${design.font_heading}, ${design.font_body}).
      Output: Single valid HTML file. NO Markdown. Use current year ${new Date().getFullYear()}.
      DESIGN: Primary: ${design.primary}, Accent: ${design.accent}, Bg: ${design.bg}.
      CONTENT: Use provided JSON Copy.
      DATA: ${JSON.stringify(contentPayload, null, 2)}
    `;
  }

  private refineCopy(copy: LandingCopy): LandingCopy {
    if (!copy.hero.bullets || copy.hero.bullets.length < 3) {
      copy.hero.bullets = ["Keunggulan 1", "Keunggulan 2", "Keunggulan 3"];
    }
    return copy;
  }
}