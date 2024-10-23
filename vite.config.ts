import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets/'),
      '@components': resolve(__dirname, './src/components/'),
      '@contexts': resolve(__dirname, './src/contexts/'),
      '@hooks': resolve(__dirname, './src/hooks/'),
      '@screens': resolve(__dirname, './src/screens/'),
      '@services': resolve(__dirname, './src/services/'),
      '@styles': resolve(__dirname, './src/styles/'),
      '@types': resolve(__dirname, './src/types/'),
      '@utils': resolve(__dirname, './src/utils/'),
    },
  },

  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
});
