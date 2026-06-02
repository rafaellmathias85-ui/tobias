#!/usr/bin/env bash
# INÍCIO RÁPIDO - Quick Start Deploy Setup
# Execute este script para verificar se tudo está pronto

echo "🚀 VERIFICAÇÃO DE SETUP - Tobias Deploy"
echo "========================================"
echo ""

# Verificar Git
if command -v git &> /dev/null; then
    echo "✅ Git instalado"
    git_status=$(git status 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo "   ✅ Git repository inicializado"
        origin=$(git config --get remote.origin.url 2>/dev/null)
        if [ -n "$origin" ]; then
            echo "   ✅ Remote vinculado: $origin"
        else
            echo "   ⚠️  Remote não configurado"
            echo "   → Execute: git remote add origin https://github.com/rafaellmathias85-ui/tobias.git"
        fi
    else
        echo "   ⚠️  Não é um repositório Git"
        echo "   → Execute: git init && git add . && git commit -m 'Initial commit'"
    fi
else
    echo "❌ Git não instalado"
fi

echo ""

# Verificar Node.js
if command -v node &> /dev/null; then
    node_version=$(node -v)
    echo "✅ Node.js instalado: $node_version"
else
    echo "❌ Node.js não instalado"
fi

echo ""

# Verificar npm
if command -v npm &> /dev/null; then
    npm_version=$(npm -v)
    echo "✅ npm instalado: $npm_version"
else
    echo "❌ npm não instalado"
fi

echo ""

# Verificar arquivos criados
echo "📁 Verificando arquivos de deploy:"
files=(
    ".github/workflows/deploy.yml"
    ".github/workflows/deploy-simples.yml"
    "DEPLOY_GUIDE.md"
    "SETUP_CHECKLIST.md"
    "DEPLOYMENT_SUMMARY.md"
    ".env.example"
    "ecosystem.config.js"
    "start.sh"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ⚠️  $file NÃO ENCONTRADO"
    fi
done

echo ""
echo "========================================"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo ""
echo "1️⃣  Faça o commit e push do código:"
echo "    git add ."
echo "    git commit -m 'setup: CI/CD pipeline'"
echo "    git push -u origin main"
echo ""
echo "2️⃣  Configure GitHub Secrets:"
echo "    https://github.com/rafaellmathias85-ui/tobias/settings/secrets/actions"
echo ""
echo "    Adicione:"
echo "    - FTP_HOST = 148.251.86.214"
echo "    - FTP_USERNAME = seu_usuario"
echo "    - FTP_PASSWORD = sua_senha"
echo "    - FTP_REMOTE_DIR = /home/usuario/public_html/app"
echo ""
echo "3️⃣  Teste o deploy manualmente:"
echo "    npm run build"
echo "    # Envie manualmente via FTP"
echo ""
echo "4️⃣  Faça novo push para testar automático:"
echo "    git add . && git commit -m 'test: trigger workflow'"
echo "    git push"
echo ""
echo "📖 Para mais informações, veja:"
echo "   - DEPLOYMENT_SUMMARY.md"
echo "   - DEPLOY_GUIDE.md"
echo "   - SETUP_CHECKLIST.md"
echo ""
echo "✨ Tudo pronto para começar!"
