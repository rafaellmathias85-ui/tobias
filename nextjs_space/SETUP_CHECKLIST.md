# 📋 CHECKLIST - Preparação para Deploy GitHub + FTP CPanel

## ✅ Etapa 1: Preparação do Repositório Local

- [ ] Projeto Next.js funciona localmente (`npm run dev`)
- [ ] Build funciona localmente (`npm run build` sem erros)
- [ ] Arquivo `.gitignore` está configurado corretamente
- [ ] Não há arquivos sensíveis versionados (`.env`, senhas, etc)
- [ ] Todos os arquivos foram commitados (`git status` limpo)

## ✅ Etapa 2: Configurar GitHub

- [ ] Repositório foi criado/vinculado em https://github.com/rafaellmathias85-ui/tobias
- [ ] Código foi feito push para a branch `main`
- [ ] Verificar se as branches aparecem em GitHub

## ✅ Etapa 3: Configurar GitHub Secrets

Acesse: **Settings → Secrets and variables → Actions**

Adicione os seguintes secrets:

### 🔐 Credenciais FTP (Obrigatório)
```
[ ] FTP_HOST = 148.251.86.214
[ ] FTP_USERNAME = seu_usuario_cpanel
[ ] FTP_PASSWORD = sua_senha_ftp
[ ] FTP_REMOTE_DIR = /home/seu_usuario/public_html/app
```

### 🔐 Credenciais SSH (Opcional - para reiniciar app)
```
[ ] SSH_HOST = 148.251.86.214
[ ] SSH_USERNAME = seu_usuario_cpanel
[ ] SSH_PASSWORD = sua_senha_cpanel
[ ] SSH_PORT = 22
```

### 🔐 Variáveis da Aplicação
```
[ ] NEXT_PUBLIC_API_URL = https://seu-dominio.com.br/api
[ ] DATABASE_URL = (se aplicável)
[ ] NEXTAUTH_SECRET = (se usar autenticação)
```

## ✅ Etapa 4: Configurar CPanel/Hospedagem

### Opção A: Node.js App via CPanel (Recomendado)
- [ ] Acesse cPanel
- [ ] Navegue até "Setup Node.js App"
- [ ] Selecione Node.js 18+ ou superior
- [ ] Configure:
  - Application root: `/home/seu_usuario/public_html/app`
  - Application URL: `seu-dominio.com.br`
  - Application startup file: `npm start`
- [ ] Teste a aplicação

### Opção B: PM2 via SSH
- [ ] Conecte via SSH: `ssh usuario@148.251.86.214`
- [ ] Instale PM2: `npm install -g pm2`
- [ ] Configure conforme `ecosystem.config.js`
- [ ] Inicie: `pm2 start ecosystem.config.js`

## ✅ Etapa 5: Verificar Credenciais FTP

- [ ] Teste conexão FTP no CPanel:
  - Host: 148.251.86.214
  - Usuário: (seu username FTP)
  - Senha: (sua senha FTP)
- [ ] Confirme a pasta `/home/seu_usuario/public_html/app` existe
- [ ] Verifique permissões de escrita nessa pasta

## ✅ Etapa 6: Fazer Push e Testar Deploy

```bash
# No seu computador
cd seu-projeto
git add .
git commit -m "feat: setup CI/CD pipeline"
git push origin main
```

- [ ] Acesse GitHub → aba "Actions"
- [ ] Veja o workflow executando
- [ ] Aguarde conclusão (pode levar 2-5 minutos)
- [ ] Verifique se os arquivos foram enviados via FTP
- [ ] Teste a aplicação no domínio

## ✅ Etapa 7: Monitoramento e Manutenção

- [ ] Monitore logs do GitHub Actions
- [ ] Configure alertas para falhas de deploy
- [ ] Teste atualizações em branch antes de merge
- [ ] Mantenha dependências atualizadas

## 🚨 Troubleshooting

### Deploy falha com erro de autenticação FTP
```
→ Verifique FTP_HOST, FTP_USERNAME e FTP_PASSWORD nos Secrets
→ Confirme que o usuário FTP tem acesso à pasta remote_dir
```

### Build falha
```
→ Verifique o log completo no GitHub Actions
→ Tente fazer build localmente para reproduzir
→ Verifique se todas as dependências estão instaladas
```

### Aplicação não inicia após deploy
```
→ Conecte via SSH e verifique permissões
→ Veja logs: tail -f ~/logs/error_log
→ Confirme que PORT 3000 está disponível
```

## 📞 Referências Úteis

- Repositório: https://github.com/rafaellmathias85-ui/tobias
- Deploy Guide: [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)
- GitHub Actions Docs: https://docs.github.com/en/actions
- Next.js Docs: https://nextjs.org/docs

---

**Após completar todas as etapas, o deploy será automático a cada push para main! 🚀**
