# 🚀 Guia de Deploy - GitHub Actions + FTP CPanel

## 📋 Pré-requisitos

1. **Repositório GitHub** - O repositório deve estar conectado
2. **Credenciais CPanel/FTP** - Usuário e senha FTP da hospedagem
3. **Acesso SSH** (opcional) - Para reiniciar a aplicação automaticamente

## 🔐 Configurar GitHub Secrets

Acesse: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### Secrets Obrigatórios:

```
FTP_HOST = 148.251.86.214
FTP_USERNAME = seu_usuario_cpanel
FTP_PASSWORD = sua_senha_ftp
FTP_REMOTE_DIR = /home/cpanel_user/public_html/app
```

### Secrets Opcionais (para SSH):

```
SSH_HOST = 148.251.86.214
SSH_USERNAME = seu_usuario_cpanel
SSH_PASSWORD = sua_senha_cpanel
SSH_PORT = 22
```

### Secrets de Aplicação:

```
NEXT_PUBLIC_API_URL = https://seudominio.com.br/api
DATABASE_URL = (se usar banco de dados remoto)
```

## 📁 Estrutura de Diretórios no CPanel

```
/home/cpanel_user/public_html/
├── app/                    # Seu repositório Next.js
│   ├── .next/
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│   └── ...
├── node_modules/
└── (outros arquivos do servidor)
```

## 🔄 Fluxo de Deploy

1. **Push para main/master** → Dispara workflow automaticamente
2. **Build** → Compila o Next.js
3. **Deploy FTP** → Envia arquivos via FTP
4. **Restart App** → Reinicia a aplicação (SSH)

## 🛠️ Configurar CPanel

### Opção 1: Usando Node.js via CPanel

1. Acesse **Setup Node.js App** no CPanel
2. Selecione a versão Node.js (recomendado 18+)
3. Configurar:
   - **App mode**: Production
   - **Application root**: `/home/cpanel_user/public_html/app`
   - **Application URL**: `seu-dominio.com.br`
   - **Application startup file**: `npm start`

### Opção 2: Usando PM2 (Gerenciador de Processos)

```bash
# SSH para o servidor
ssh cpanel_user@148.251.86.214

# Navegar até a aplicação
cd /home/cpanel_user/public_html/app

# Instalar PM2 globalmente
npm install -g pm2

# Iniciar aplicação
pm2 start npm --name "nextjs-app" -- start

# Fazer PM2 iniciar com o servidor
pm2 startup
pm2 save
```

### Opção 3: Usar Passenger (Phusion)

CPanel geralmente tem Passenger pré-instalado. Você pode usar o arquivo `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  <IfModule mod_ssl.c>
    SSLEngine on
  </IfModule>

  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ index.js [QSA,L]
</IfModule>
```

## 📝 Arquivo .env para Produção

Crie um arquivo `.env.production` no servidor:

```
NODE_ENV=production
PORT=3000
NEXTAUTH_URL=https://seu-dominio.com.br
NEXTAUTH_SECRET=sua_chave_secreta_aqui
DATABASE_URL=sua_url_banco_dados
```

## ✅ Verificar Status de Deployment

No repositório GitHub:
1. Acesse aba **Actions**
2. Veja o status dos workflows
3. Clique em um workflow para ver logs detalhados

## 🔍 Troubleshooting

### Deploy falha com erro de permissão FTP
- Verifique credenciais no CPanel
- Confirme que o usuário FTP tem permissão na pasta `public_html`

### Aplicação não inicia após deploy
- Conecte via SSH e verifique logs de erro
- Confirme que `node_modules` foi instalado
- Verifique se `PORT=3000` está disponível

### Build falha por falta de memória
- Aumente o limite de memória ou otimize o build
- Considere usar um runner mais poderoso

## 🚀 Primeiro Deploy Manual

1. Clone o repositório localmente
2. Execute `npm install`
3. Execute `npm run build`
4. Faça upload via FTP ou SSH dos arquivos:
   ```
   .next/
   public/
   package.json
   next.config.js
   node_modules/
   .env.production
   ```

## 📞 Suporte

- GitHub Actions Docs: https://docs.github.com/actions
- Next.js Deploy: https://nextjs.org/docs/deployment
- FTP Deploy Action: https://github.com/valerio-froidl/ftp-deploy-action

---

**Após configurar os secrets, o deploy será automático a cada push para a branch main!** ✨
