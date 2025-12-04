// File: apps/api/webpack.config.js

const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (options, webpack) => {
  // Mencari path absolut ke folder instalasi @prisma/client
  // require.resolve akan mengembalikan path ke index.js, jadi kita ambil dirname-nya
  const prismaClientPath = path.dirname(require.resolve('@prisma/client'));

  console.log('✅ Webpack: Prisma Client found at:', prismaClientPath);

  return {
    ...options,
    plugins: [
      ...options.plugins,
      new CopyPlugin({
        patterns: [
          {
            // Salin SEMUA file engine (.node) dari folder @prisma/client
            // Menggunakan glob pattern yang kompatibel dengan Windows (slash forward /)
            from: path.join(prismaClientPath, '*.node').replace(/\\/g, '/'),
            to: '[name][ext]', // Salin ke root folder output (dist/)
            globOptions: {
              ignore: ['**/*.d.ts', '**/*.js'], // Jangan salin file JS/TS
            },
            noErrorOnMissing: true,
          },
          {
             // Salin schema.prisma (opsional, untuk referensi debug)
             from: path.resolve(__dirname, '../../packages/database/prisma/schema.prisma').replace(/\\/g, '/'),
             to: '[name][ext]',
             noErrorOnMissing: true,
          }
        ],
      }),
    ],
  };
};