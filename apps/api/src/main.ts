// File: apps/api/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Daftar Origins yang diizinkan
  const allowedOrigins = [
    'http://localhost:3000',           // Frontend Development (Lokal)
    'https://lamman.app',              // ✅ Domain Utama
    'https://www.lamman.app',          // ✅ Domain Utama (www)
    /(\.vercel\.app)$/,                // ✅ Semua preview domain Vercel
  ];

  // 1. Enable CORS (Dengan Origin Spesifik & Credentials)
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 👈 Wajib untuk mengirim header Authorization (JWT)
  });

  // 2. Enable Validasi DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 3. Jalankan Server
  // PENTING: Bind ke '0.0.0.0' agar bisa diakses dari luar container Railway
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();