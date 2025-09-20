# 🚀 Template Base - Fibboweb

Template padronizado para desenvolvimento de projetos na Fibboweb com boas práticas, ferramentas de qualidade de código e workflows automatizados.

## 📋 Índice

- [Características](#características)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Padrões de Código](#padrões-de-código)
- [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)

## ✨ Características

- 🔧 **ESLint** - Linting de código JavaScript/TypeScript
- 🎨 **Prettier** - Formatação automática de código
- 🪝 **Husky** - Git hooks para validação
- 📝 **Commitlint** - Padronização de mensagens de commit
- 🚫 **Pre-commit** - Validações automáticas antes do commit
- 📚 **Documentação** - Guias de contribuição e estilo
- 🎯 **Templates** - PR e Issues padronizados
- ⚙️ **VS Code** - Configurações de workspace

## 🛠️ Instalação

### Pré-requisitos

- **Node.js**: v18+ (recomendado: v20 LTS)
- **Gerenciador de Pacotes**: Bun (preferencial), npm ou yarn
- **Git**: v2.30+

### Passos

1. **Clone o template**
   ```bash
   git clone <repo-url>
   cd <project-name>
   ```

2. **Instale as dependências**
   ```bash
   # Com Bun (recomendado)
   bun install

   # Ou com npm
   npm install

   # Ou com yarn
   yarn install
   ```

3. **Configure os hooks do Git**
   ```bash
   bun run prepare
   ```

4. **Valide a instalação**
   ```bash
   bun run validate
   ```

## ⚙️ Configuração

### VS Code

O template inclui configurações automáticas para o VS Code:

- **Extensões recomendadas** (`.vscode/extensions.json`)
- **Configurações de workspace** (`.vscode/settings.json`)
- **Formatação automática** ao salvar
- **Linting em tempo real**

### EditorConfig

Configurações universais para qualquer editor (`.editorconfig`):

- **Indentação**: 2 espaços
- **Charset**: UTF-8
- **Final de linha**: LF
- **Limite de linha**: 100 caracteres

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
bun run dev          # Inicia servidor de desenvolvimento
bun run build        # Build de produção
bun run start        # Inicia aplicação

# Qualidade de Código
bun run lint         # Executa ESLint
bun run lint:fix     # Corrige problemas do ESLint
bun run format       # Formata código com Prettier
bun run format:check # Verifica formatação
bun run type-check   # Verifica tipos TypeScript
bun run validate     # Executa todas as validações

# Utilitários
bun run clean        # Remove arquivos de build
bun run test         # Executa testes
```

## 📏 Padrões de Código

### JavaScript/TypeScript

- ✅ **Arrow Functions**: `() => {}`
- ✅ **Constantes**: `const` por padrão
- ✅ **Naming**: camelCase para variáveis, PascalCase para classes
- ✅ **Imports**: Organizados e agrupados
- ✅ **Linhas**: Máximo 100 caracteres

### React/Next.js

- ✅ **Componentes**: PascalCase
- ✅ **Props**: Interface TypeScript obrigatória
- ✅ **Hooks**: Sempre no topo do componente
- ✅ **JSX**: Props em múltiplas linhas quando > 3

### PHP/WordPress

- ✅ **PSR-12**: Padrões PSR-12
- ✅ **Namespaces**: Sempre declarar
- ✅ **Classes**: PascalCase
- ✅ **Métodos**: camelCase

## 🔄 Workflow de Desenvolvimento

### 1. Branch Naming

```bash
feature/user-authentication
fix/login-validation-error
hotfix/critical-security-patch
refactor/api-response-handling
docs/api-documentation
```

### 2. Commits

```bash
feat(auth): add JWT token validation
fix(api): resolve user creation error
docs(readme): update installation guide
refactor(utils): simplify date formatting
```

### 3. Pull Requests

- Use o template de PR (`.github/pull_request_template.md`)
- Preencha todos os campos obrigatórios
- Adicione screenshots se aplicável
- Marque o checklist de validação

## 📁 Estrutura do Projeto

```
├── .github/                 # Templates e workflows
│   ├── ISSUE_TEMPLATE/     # Templates de issues
│   └── pull_request_template.md
├── .vscode/                # Configurações VS Code
│   ├── extensions.json     # Extensões recomendadas
│   └── settings.json       # Configurações workspace
├── scripts/                # Scripts utilitários
│   └── precommit-check.js  # Validações pre-commit
├── .editorconfig           # Configuração universal
├── .eslintrc.js           # Configuração ESLint
├── .prettierrc            # Configuração Prettier
├── .prettierignore        # Arquivos ignorados pelo Prettier
├── .gitignore             # Arquivos ignorados pelo Git
├── commitlint.config.js   # Configuração Commitlint
├── CONTRIBUTING.md        # Guia de contribuição
├── STYLEGUIDE.md         # Guia de estilo
└── package.json          # Dependências e scripts
```

## 🚫 Validações Automáticas

### Pre-commit Hooks

O template bloqueia commits que contenham:

- ❌ `console.log`, `console.debug`, etc.
- ❌ `debugger`, `alert`, `var`
- ❌ `TODO`, `FIXME`, `HACK`, `XXX`
- ❌ `var_dump`, `print_r`, `die`, `exit` (PHP)
- ❌ Arquivos `.env` ou credenciais
- ❌ Segredos e chaves de API

### Commitlint

Valida mensagens de commit seguindo o padrão:

```
tipo(escopo): descrição

feat(auth): add JWT token validation
fix(api): resolve user creation error
docs(readme): update installation guide
```

## 📚 Documentação

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guia completo de contribuição
- **[STYLEGUIDE.md](./STYLEGUIDE.md)** - Padrões de código e exemplos
- **[Templates GitHub](./.github/)** - Templates de PR e Issues

## 🤝 Contribuição

1. Leia o [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Siga o [STYLEGUIDE.md](./STYLEGUIDE.md)
3. Use os templates de PR e Issues
4. Execute `bun run validate` antes de commitar

## 📞 Suporte

Para dúvidas ou sugestões:

- Abra uma [issue](https://github.com/fibboweb/repo-base/issues)
- Contate a equipe de desenvolvimento
- Consulte a documentação do projeto

---

**Desenvolvido com ❤️ pela equipe Fibboweb**
