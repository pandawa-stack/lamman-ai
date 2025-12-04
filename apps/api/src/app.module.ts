// File: apps/api/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiGeneratorModule } from './ai-generator/ai-generator.module';
import { AuthModule } from './auth/auth.module'; // 👈 Import AuthModule
import { UserModule } from './user/user.module'; // 👈 Import UserModule
import { ProjectsModule } from './projects/projects.module'; // 👈 Import

@Module({
  imports: [
    // Konfigurasi global untuk .env
    ConfigModule.forRoot({
      isGlobal: true, 
    }), 
    // Modul Utama
    AiGeneratorModule,
    
    // ✅ Tambahkan Modul Auth dan User
    AuthModule,
    UserModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}