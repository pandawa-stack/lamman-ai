// File: apps/api/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Daftar Origins yang diizinkan (untuk Vercel dan lokal)
  const allowedOrigins = [
    'http://localhost:3000',           // Frontend Development (Lokal)
    'https://lamman.app',              // ✅ Domain Produksi Utama Anda
    /(\.vercel\.app)$/,                // ✅ Mengizinkan semua preview domain Vercel
  ];

  // 1. Enable CORS (Dengan Origin Spesifik & Credentials)
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 👈 Wajib untuk mengirim header Authorization (JWT)
  });

  // 2. Enable Validasi DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 3. Jalankan di PORT 3001 (menggunakan env var dari Railway)
  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();