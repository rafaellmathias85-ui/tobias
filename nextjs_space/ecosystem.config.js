// ecosystem.config.js - Configuração PM2 para produção
// Copie este arquivo para a raiz do projeto

module.exports = {
  apps: [
    {
      name: 'nextjs-app',
      script: 'npm',
      args: 'start',
      cwd: '/home/cpanel_user/public_html/app',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      listen_timeout: 3000,
      kill_timeout: 5000,
    },
  ],
};
