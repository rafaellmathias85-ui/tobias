# ⚙️ Workflow Deployment - Qual Usar?

## Você tem 2 opções:

### 🚀 Opção 1: `deploy.yml` (RECOMENDADO - Completo)
**Arquivo**: `.github/workflows/deploy.yml`

#### Características:
- ✅ Build + FTP Deploy + SSH Restart (tudo em um)
- ✅ Suporte a múltiplas branches
- ✅ Integração com PM2 ou systemd
- ✅ Logs detalhados e notificações
- ✅ Cache de dependências (mais rápido)
- ✅ Validação completa

#### Quando usar:
- Você quer deploy totalmente automatizado
- Quer reiniciar a app automaticamente após deploy
- Quer jobs em paralelo (mais rápido)
- Ambiente de produção estável

#### Requisitos Adicionais:
```
- Secrets: FTP_HOST, FTP_USERNAME, FTP_PASSWORD, FTP_REMOTE_DIR
- Opcional: SSH_HOST, SSH_USERNAME, SSH_PASSWORD, SSH_PORT
```

#### Tempo de Execução:
~3-5 minutos por deploy

---

### 🏃 Opção 2: `deploy-simples.yml` (Rápido e Simples)
**Arquivo**: `.github/workflows/deploy-simples.yml`

#### Características:
- ✅ Setup minimalista
- ✅ Fácil de debugar
- ✅ Sem dependências SSH
- ✅ Ideal para testes
- ✅ Menos linhas de código

#### Quando usar:
- Você é iniciante no GitHub Actions
- Quer testar o deploy primeiro
- Ambiente de staging
- Quer algo simples e funcional

#### Requisitos Apenas:
```
- Secrets: FTP_HOST, FTP_USERNAME, FTP_PASSWORD, FTP_REMOTE_DIR
```

#### Tempo de Execução:
~2-3 minutos por deploy

---

## 🎯 Recomendação

### Para Produção (Selecionado)
```bash
# Use o deploy.yml completo
# Desative o deploy-simples.yml para não ter conflitos

# No arquivo deploy-simples.yml, adicione:
# on:
#   push:
#     branches:
#       - staging  # Ou desative completamente
```

### Processo:
1. **Primeiro push** → `deploy-simples.yml` roda (teste rápido)
2. **Verifique se funcionou** → App está online?
3. **Depois use `deploy.yml`** → Deployment profissional com restart

---

## 🔄 Como Alternar Entre Eles

### Usar APENAS deploy.yml (RECOMENDADO)
```bash
# Desative deploy-simples
# Edite .github/workflows/deploy-simples.yml:
# on:
#   workflow_dispatch:  # Não automático
```

### Usar APENAS deploy-simples.yml (Para teste)
```bash
# Desative deploy.yml temporariamente
# Renomeie para deploy.yml.disabled
```

### Usar os dois
```bash
# Não recomendado! Pode causar conflitos
# Melhor definir branches diferentes em cada um
```

---

## 📊 Comparação Detalhada

| Aspecto | deploy.yml | deploy-simples.yml |
|---------|-----------|------------------|
| Complexidade | Avançada | Simples |
| Funções | Build + Deploy + Restart | Build + Deploy |
| SSH Support | Sim | Não |
| Paralelo | Sim (mais rápido) | Não |
| Restart automático | Sim | Manual |
| Melhor para | Produção | Teste/Staging |
| Tempo setup | 5-10 min | 2-3 min |
| Tempo execução | 3-5 min | 2-3 min |

---

## ✅ RECOMENDAÇÃO FINAL

### Para seu caso (148.251.86.214 CPanel):

**1. Comece com `deploy-simples.yml`** (teste rápido)
```bash
# Faça um push e veja se funciona
git push origin main
```

**2. Se funcionar, mude para `deploy.yml`** (produção)
```bash
# Delete/rename deploy-simples.yml
rm .github/workflows/deploy-simples.yml
# Ou edite para não rodar automático
```

**3. Configure o restart automático** (quando aplicável)
```bash
# Edite deploy.yml com secrets SSH
# SSH_HOST, SSH_USERNAME, SSH_PASSWORD, SSH_PORT
```

---

## 🚨 Troubleshooting

### Ambos os workflows rodando?
→ Edite um para usar `workflow_dispatch` em vez de `push`

### Deploy lento?
→ Use `deploy-simples.yml` ou otimize o build

### Restart não funciona?
→ SSH pode estar desabilitado, use Node.js App no CPanel

### FTP timeout?
→ Aumente o timeout ou use SCP em vez de FTP

---

## 📞 Próximos Passos

1. **Escolha um workflow** (recomendado: `deploy.yml`)
2. **Configure os Secrets** do GitHub
3. **Faça um push teste**
4. **Verifique em GitHub Actions**
5. **Acesse seu site para validar**

**Está pronto? Vá para [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) 🚀**
