#!/bin/bash

# Script de inicialização da aplicação Next.js no CPanel
# Coloque este arquivo em: /home/cpanel_user/public_html/app/start.sh
# Dê permissão de execução: chmod +x start.sh

set -e

echo "🚀 Iniciando aplicação Next.js..."

# Definir variáveis de ambiente
export NODE_ENV=production
export PORT=3000

# Navegar até o diretório da aplicação
cd "$(dirname "$0")"

# Limpar cache antigo se existir
if [ -d ".next/cache" ]; then
    echo "🧹 Limpando cache..."
    rm -rf .next/cache
fi

# Instalar dependências se não existirem
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm ci --omit=dev
fi

# Iniciar aplicação
echo "✅ Aplicação iniciada!"
exec npm start
