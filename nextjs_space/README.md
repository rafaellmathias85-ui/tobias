# 🎨 Tobias - Site Turma do Tobias

Aplicação web moderna construída com **Next.js**, **TypeScript**, **Tailwind CSS** e **Prisma**.

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+ ([Download](https://nodejs.org/))
- npm ou yarn
- Git

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/rafaellmathias85-ui/tobias.git
cd tobias/nextjs_space

# Instale as dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas configurações

# Execute migrations do Prisma (se necessário)
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📦 Scripts Disponíveis

```bash
npm run dev       # Inicia servidor de desenvolvimento
npm run build     # Faz build para produção
npm start         # Inicia servidor de produção
npm run lint      # Executa ESLint
```

## 🏗️ Estrutura do Projeto

```
nextjs_space/
├── app/              # App router do Next.js
│   ├── api/          # Rotas de API
│   ├── blog/         # Página de blog
│   ├── admin/        # Área administrativa
│   └── ...
├── components/       # Componentes reutilizáveis
│   ├── ui/           # Componentes UI (shadcn)
│   └── layouts/      # Layouts
├── lib/              # Utilitários e funções
├── prisma/           # Schema do banco de dados
└── public/           # Arquivos estáticos
```

## 🗄️ Banco de Dados

O projeto usa **Prisma** como ORM.

```bash
# Criar/atualizar migrations
npx prisma migrate dev --name "descricao"

# Ver banco de dados
npx prisma studio

# Fazer seed
npx prisma db seed
```

## 🔐 Autenticação

Usa **NextAuth.js** para autenticação. Configure em `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu_secret_bem_seguro_aqui
```

## 🚀 Deploy

### Via GitHub Actions + FTP

O projeto está configurado com CI/CD automático!

1. **Pushiar para `main`** → Dispara build automático
2. **Build** → Compila Next.js
3. **Deploy FTP** → Envia para CPanel
4. **Restart** → Reinicia a aplicação

**Veja** [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) para instruções completas.

### Setup Rápido do Deploy

1. Vá para repositório no GitHub
2. **Settings → Secrets and variables → Actions**
3. Adicione os secrets necessários (veja [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md))
4. Faça push e veja a magia acontecer! ✨

## 🛠️ Tecnologias

- **Framework**: Next.js 15
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Banco de Dados**: Prisma + PostgreSQL
- **Autenticação**: NextAuth.js
- **Componentes UI**: shadcn/ui
- **Validação**: React Hook Form + Zod
- **Storage**: AWS S3 / Azure Blob

## 📝 Convenções

- Componentes em PascalCase: `UserCard.tsx`
- Hooks customizados: `useAuth.ts`
- Arquivo de tipos: `types.ts` em cada diretório
- Estilos Tailwind inline
- Componentes serveur-side por padrão

## 🤝 Contributing

1. Crie uma branch: `git checkout -b feature/minha-feature`
2. Commit: `git commit -am 'Add nova feature'`
3. Push: `git push origin feature/minha-feature`
4. Abra um Pull Request

## 📖 Documentação

- [Guia de Deploy](./DEPLOY_GUIDE.md)
- [Checklist de Setup](./SETUP_CHECKLIST.md)
- [Style Guide](./STYLE_GUIDE.md)

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no GitHub.

---

**Made with ❤️ by Turma do Tobias**
