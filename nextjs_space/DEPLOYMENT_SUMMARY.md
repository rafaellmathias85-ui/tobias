# 🎯 RESUMO - Preparação para Deploy GitHub + FTP

## 📦 Arquivos Criados

### 1. **`.github/workflows/deploy.yml`** ⭐ PRINCIPAL
- Workflow do GitHub Actions completo
- Faz build automático do Next.js
- Deploy via FTP para CPanel (148.251.86.214)
- Reinicia a aplicação via SSH (opcional)

### 2. **`DEPLOY_GUIDE.md`** 📖
- Guia completo de configuração
- Instruções para CPanel
- Opções de gerenciamento de processo (PM2, Passenger, Node.js App)
- Troubleshooting

### 3. **`SETUP_CHECKLIST.md`** ✅
- Checklist passo a passo
- Etapas de configuração GitHub Secrets
- Verificação de credenciais FTP
- Instruções para teste do deploy

### 4. **`.env.example`** 🔐
- Exemplo de variáveis de ambiente
- Documentadas todas as opções
- Pronto para copiar e editar

### 5. **`ecosystem.config.js`** ⚙️
- Configuração PM2 para produção
- Gerenciamento automático de processo
- Logging e restart automático

### 6. **`start.sh`** 🚀
- Script de inicialização bash
- Limpa cache e instala dependências
- Pronto para usar no CPanel

### 7. **`README.md`** 📚
- Documentação geral do projeto
- Quick start
- Estrutura do projeto

---

## 🔧 PRÓXIMOS PASSOS IMEDIATOS

### 1️⃣ **Conectar ao GitHub** (Se ainda não feito)

```bash
cd seu-projeto
git init
git add .
git commit -m "Initial commit: setup CI/CD pipeline"
git branch -M main
git remote add origin https://github.com/rafaellmathias85-ui/tobias.git
git push -u origin main
```

### 2️⃣ **Configurar GitHub Secrets**

Acesse: https://github.com/rafaellmathias85-ui/tobias/settings/secrets/actions

Adicione (clicando em "New repository secret"):

```
FTP_HOST
→ Valor: 148.251.86.214

FTP_USERNAME
→ Valor: seu_username_cpanel (ex: cpaneluser)

FTP_PASSWORD
→ Valor: sua_senha_ftp

FTP_REMOTE_DIR
→ Valor: /home/cpaneluser/public_html/app
   (Pode variar - verifique no CPanel)
```

**Opcionais (para SSH):**
```
SSH_HOST → 148.251.86.214
SSH_USERNAME → cpaneluser
SSH_PASSWORD → sua_senha
SSH_PORT → 22
```

### 3️⃣ **Verificar Estrutura CPanel**

Acesse seu CPanel (usuário@IP ou via browser) e:
- Verifique a pasta `/home/seu_usuario/public_html/`
- Confirme que pode fazer upload de arquivos
- Note a estrutura exata de diretórios

### 4️⃣ **Primeiro Deploy Manual (Teste)**

```bash
# 1. Build localmente
npm run build

# 2. Copie via FTP (usando FileZilla ou similar):
#    - .next/ → /home/seu_usuario/public_html/app/.next/
#    - public/ → /home/seu_usuario/public_html/app/public/
#    - package.json → /home/seu_usuario/public_html/app/
#    - next.config.js → /home/seu_usuario/public_html/app/

# 3. SSH para o servidor:
ssh seu_usuario@148.251.86.214

# 4. No servidor:
cd /home/seu_usuario/public_html/app
npm ci --omit=dev
npm start
```

### 5️⃣ **Testar Deploy Automático**

```bash
# Faça uma mudança pequena
echo "# Test commit" >> README.md

# Commit e push
git add .
git commit -m "test: trigger deploy workflow"
git push origin main

# Acesse GitHub → Actions e veja o workflow rodando!
```

---

## 📊 Fluxo Automático Após Configuração

```
┌─────────────────┐
│  Git Push Main  │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ GitHub Actions      │
│ 1. Checkout        │
│ 2. Install deps    │
│ 3. Build Next.js   │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ FTP Deploy          │
│ Upload files to:    │
│ 148.251.86.214      │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ SSH Restart         │
│ (opcional)          │
│ Restart app process │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ ✅ Live!            │
│ Site atualizado!    │
└─────────────────────┘
```

---

## 🆘 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| **FTP falha** | Verifique FTP_HOST, FTP_USERNAME, FTP_PASSWORD nos Secrets |
| **Build falha** | Verifique logs em GitHub Actions → Actions → workflow |
| **App não inicia** | Conecte via SSH e verifique: `npm ls` (dependências ok?) |
| **Porta 3000 ocupada** | Configure PORT diferente no `.env.production` |
| **Permissões negadas** | Confirme que usuário FTP tem permissão na pasta |

---

## 📞 Documentação Adicional

- ▶️ [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) - Guia detalhado
- ✅ [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - Checklist passo a passo
- 📖 [README.md](./README.md) - Documentação geral
- 🔧 [.env.example](./.env.example) - Variáveis de ambiente

---

## 🎯 STATUS ATUAL

✅ **Workflow GitHub Actions** criado e pronto  
✅ **Documentação completa** preparada  
✅ **Configuração CPanel** documentada  
✅ **Scripts de deploy** inclusos  

⏳ **Próximo**: Configurar GitHub Secrets e fazer primeiro push!

---

**Você está a apenas alguns cliques de ter deploy automático! 🚀**

Qualquer dúvida, revise os guias ou execute manualmente uma vez antes de confiar no automático.
