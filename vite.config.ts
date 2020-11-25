import { ServerConfig } from 'vite';
import path from 'path';

const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

const config: ServerConfig = {
  alias: {
    '/@/': pathResolve('./src'),
  },
  proxy: {
    '/api': {
      ws: false,
      target: 'http://localhost:3456',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, ''),
    },
  },
};

module.exports = config;
