# Guia de Contribuição - Fibboweb

Este documento estabelece as diretrizes para contribuir com os projetos da Fibboweb. Siga estas regras para manter a qualidade e consistência do código.

## 📋 Índice

- [Configuração do Ambiente](#configuração-do-ambiente)
- [Fluxo de Trabalho](#fluxo-de-trabalho)
- [Padrões de Branch](#padrões-de-branch)
- [Padrões de Commit](#padrões-de-commit)
- [Pull Requests](#pull-requests)
- [Padrões de Código](#padrões-de-código)
- [Checklist de PR](#checklist-de-pr)

## 🛠️ Configuração do Ambiente

### Pré-requisitos
- **Node.js**: v18+ (recomendado: v20 LTS)
- **Gerenciador de Pacotes**: Bun (preferencial) ou npm/yarn
- **Editor**: VS Code com extensões recomendadas
- **Git**: v2.30+

### Instalação
```bash
# Clone o repositório
git clone <repo-url>
cd <project-name>

# Instale dependências
bun install
# ou
npm install

# Configure hooks do Git
bun run prepare
```

## 🌿 Fluxo de Trabalho

### 1. Branch Naming Convention

**Formato**: `tipo/descrição-breve`

#### Tipos Permitidos:
- `feature/` - Novas funcionalidades
- `fix/` - Correções de bugs
- `hotfix/` - Correções urgentes em produção
- `refactor/` - Refatoração de código
- `docs/` - Documentação
- `style/` - Formatação, espaços, etc.
- `test/` - Adição ou correção de testes
- `chore/` - Tarefas de manutenção

#### Exemplos:
```bash
feature/user-authentication
fix/login-validation-error
hotfix/critical-security-patch
refactor/api-response-handling
docs/api-documentation
```

### 2. Padrões de Commit

**Formato**: `tipo(escopo): descrição`

#### Tipos:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

#### Regras:
- **Máximo 50 caracteres** na primeira linha
- Use **imperativo** (ex: "add" não "added")
- **Sem ponto final** na primeira linha
- **Escopo opcional** entre parênteses

#### Exemplos:
```bash
feat(auth): add JWT token validation
fix(api): resolve user creation error
docs(readme): update installation guide
refactor(utils): simplify date formatting
```

### 3. Pull Requests

#### Template Obrigatório:
```markdown
## 📝 Descrição
Breve descrição das mudanças realizadas.

## 🔗 Tipo de Mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## 🧪 Como Testar
1. Passo 1
2. Passo 2
3. Passo 3

## 📸 Screenshots (se aplicável)

## ✅ Checklist
- [ ] Código segue os padrões do projeto
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Sem console.log em produção
```

## 📏 Padrões de Código

### JavaScript/TypeScript
- **Arrow Functions**: Sempre use `() => {}` para funções
- **Constantes**: `const` por padrão, `let` quando necessário
- **Naming**: camelCase para variáveis/funções, PascalCase para classes
- **Linhas**: Máximo 100 caracteres por linha
- **Imports**: Organizados e agrupados

### React/Next.js
- **Componentes**: PascalCase
- **Hooks**: Sempre no topo do componente
- **Props**: Interface TypeScript obrigatória
- **JSX**: Props em múltiplas linhas quando > 3 props

### PHP/WordPress
- **PSR-12**: Seguir padrões PSR-12
- **Namespaces**: Sempre declarar
- **Classes**: PascalCase
- **Métodos**: camelCase
- **Hooks**: Prefixo único do plugin

## ✅ Checklist de PR

### Antes de Abrir PR:
- [ ] Branch atualizada com `main`
- [ ] Código formatado (ESLint + Prettier)
- [ ] Testes passando
- [ ] Sem `console.log` em produção
- [ ] Commits seguem padrão estabelecido
- [ ] Documentação atualizada

### Review:
- [ ] Código legível e bem estruturado
- [ ] Performance considerada
- [ ] Segurança verificada
- [ ] Compatibilidade testada
- [ ] Sem código duplicado

## 🚫 Regras Importantes

### Nunca Commitar:
- Arquivos `.env` ou com credenciais
- `console.log`, `console.debug`, etc. em produção
- Código comentado desnecessário
- Dependências desatualizadas
- Arquivos de build (`dist/`, `build/`)

### Branches Protegidas:
- `main` - Requer PR e review
- `develop` - Requer PR
- `production` - Requer PR e aprovação

## 🆘 Suporte

Para dúvidas sobre este guia:
- Abra uma issue no repositório
- Contate a equipe de desenvolvimento
- Consulte o STYLEGUIDE.md para exemplos práticos

---

**Lembre-se**: Código limpo é responsabilidade de todos! 🚀
