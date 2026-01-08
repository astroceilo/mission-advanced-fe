import react from '@vitejs/plugin-react';
import flowbite from 'flowbite/plugin';
import { defineConfig } from 'vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), flowbite],
})
