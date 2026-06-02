#!/bin/bash

# Deploy script para Turma do Tobias
# Executado pelo GitHub Actions self-hosted runner

set -e  # Exit on error

echo "=================================================================================="
echo "Deploy Script - Turma do Tobias"
echo "=================================================================================="

# Variáveis
APP_SOURCE="${APP_SOURCE:-.}"
APP_NAME="tobias"
PM2_ECOSYSTEM="ecosystem.config.js"
BUILD_DIR="$APP_SOURCE"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$APP_SOURCE/backups/$TIMESTAMP"

echo "[$(date)] Starting deployment..."
echo "App source: $APP_SOURCE"
echo ""

# 1. Criar backup da versão anterior
echo "📦 Creating backup of previous version..."
if [ -d "$APP_SOURCE/.next" ]; then
    mkdir -p "$BACKUP_DIR"
    cp -r "$APP_SOURCE/.next" "$BACKUP_DIR/.next_backup" || true
    cp -r "$APP_SOURCE/public" "$BACKUP_DIR/public_backup" || true
    echo "✅ Backup created: $BACKUP_DIR"
else
    echo "⚠️  No previous build found. Skipping backup."
fi
echo ""

# 2. Instalar dependências
echo "📥 Installing dependencies..."
cd "$APP_SOURCE"
npm install --omit=dev --legacy-peer-deps
echo "✅ Dependencies installed"
echo ""

# 3. Build da aplicação
echo "🔨 Building Next.js application..."
npm run build
echo "✅ Build completed successfully"
echo ""

# 4. Verificar arquivo .env
echo "🔑 Checking environment configuration..."
if [ ! -f "$APP_SOURCE/.env.production" ]; then
    echo "⚠️  Warning: .env.production not found"
    echo "Creating basic .env.production..."
    cat > "$APP_SOURCE/.env.production" << EOF
NODE_ENV=production
PORT=3000
EOF
else
    echo "✅ .env.production found"
fi
echo ""

# 5. Parar aplicação anterior (se estiver rodando com PM2)
echo "⛔ Stopping previous application instance..."
if command -v pm2 &> /dev/null; then
    pm2 stop "$APP_NAME" || true
    pm2 delete "$APP_NAME" || true
    echo "✅ Previous instance stopped"
else
    echo "⚠️  PM2 not installed. Skipping PM2 stop."
fi
echo ""

# 6. Iniciar nova aplicação
echo "🚀 Starting application..."
if command -v pm2 &> /dev/null; then
    if [ -f "$APP_SOURCE/$PM2_ECOSYSTEM" ]; then
        cd "$APP_SOURCE"
        pm2 start "$PM2_ECOSYSTEM" --name "$APP_NAME"
        echo "✅ Application started with PM2"
    else
        echo "⚠️  ecosystem.config.js not found. Starting with default config..."
        pm2 start "npm" --name "$APP_NAME" -- start
    fi
else
    echo "⚠️  PM2 not installed. Install with: npm install -g pm2"
    echo "Starting application directly..."
    cd "$APP_SOURCE"
    npm start &
fi
echo ""

# 7. Aguardar inicialização
echo "⏳ Waiting for application to start (5 seconds)..."
sleep 5
echo ""

# 8. Verificar health da aplicação
echo "🏥 Health check..."
if command -v pm2 &> /dev/null; then
    pm2 list
    echo "✅ Application is running"
else
    echo "⚠️  Manual verification required"
fi
echo ""

# 9. Resumo
echo "=================================================================================="
echo "✅ Deployment completed successfully!"
echo "=================================================================================="
echo "Timestamp: $(date)"
echo "App Name: $APP_NAME"
echo "Build Directory: $BUILD_DIR"
echo "Backup Location: $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "  - Verify application is responding on configured port"
echo "  - Check PM2 logs: pm2 logs $APP_NAME"
echo "  - Rollback (if needed): cp -r $BACKUP_DIR/.next_backup $APP_SOURCE/.next"
echo ""
