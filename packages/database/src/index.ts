// File: packages/database/src/index.ts

import { Module, Injectable, OnModuleInit, OnModuleDestroy, Global } from '@nestjs/common';
// Ganti import ini (kadang namespace konflik)
import { PrismaClient } from '@prisma/client'; 

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}

// Export ulang semuanya
export * from '@prisma/client';