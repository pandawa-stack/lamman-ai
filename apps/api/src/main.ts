import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS (Agar Frontend bisa akses)
  app.enableCors({
    origin: '*', // Di production, ganti dengan URL frontend asli
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // 2. Enable Validasi DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 3. Jalankan di PORT 3001
  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();