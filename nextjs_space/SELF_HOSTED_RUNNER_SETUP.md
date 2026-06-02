# Setup Self-Hosted Runner

## Pré-requisitos
- GitHub Actions Runners v2.300+
- Node.js 18+
- Acesso com permissões de administrador

## Passos para Configurar

### 1. Download do Runner
```bash
mkdir actions-runner
cd actions-runner

# Detectar arquitetura
# Windows: download x64
# Linux: download x64
curl -o actions-runner-win-x64-2.334.0.zip https://github.com/actions/runner/releases/download/v2.334.0/actions-runner-win-x64-2.334.0.zip

# Ou para Linux:
curl -o actions-runner-linux-x64-2.334.0.tar.gz https://github.com/actions/runner/releases/download/v2.334.0/actions-runner-linux-x64-2.334.0.tar.gz
tar xzf actions-runner-linux-x64-2.334.0.tar.gz
```

### 2. Configurar o Runner
```bash
# Generate token em: https://github.com/rafaellmathias85-ui/tobias/settings/actions/runners/new

./config.sh --url https://github.com/rafaellmathias85-ui/tobias --token <TOKEN>
```

**Respostas sugeridas:**
- Runner name: `tobias-runner-1`
- Runner group: `Default`
- Labels: `tobias,production`
- Work folder: `_work` (padrão)

### 3. Iniciar o Runner
```bash
# Modo interativo (testes)
./run.sh

# Modo serviço (produção)
# Windows
./svc.cmd install
./svc.cmd start

# Linux
sudo ./svc.sh install
sudo ./svc.sh start
```

### 4. Verificar Status
- Acesse: https://github.com/rafaellmathias85-ui/tobias/settings/actions/runners
- Runner deve aparecer como "Idle" em verde ✅

## Troubleshooting

### Runner não aparece
```bash
./config.sh --check
```

### Ver logs
```bash
# Windows
Get-Content .\_diag\Runner_*.log

# Linux
tail -f ./_diag/Runner_*.log
```

### Remover Runner
```bash
./config.sh remove --token <TOKEN>
```

## Parar o Serviço
```bash
# Windows
./svc.cmd stop
./svc.cmd uninstall

# Linux
sudo ./svc.sh stop
sudo ./svc.sh uninstall
```

## Segurança
- ⚠️ Token é descartável (use token de curta duração)
- ⚠️ Runner terá acesso a todos os secrets do repositório
- ⚠️ Manter máquina/servidor atualizado
- ⚠️ Usar em máquina de confiança apenas

## Links Úteis
- https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners
- https://github.com/actions/runner/releases
