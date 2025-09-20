# Guia de Estilo - Fibboweb

Este documento define os padrões de código e estilo para todos os projetos da Fibboweb.

## 📋 Índice

- [JavaScript/TypeScript](#javascripttypescript)
- [React/Next.js](#reactnextjs)
- [PHP/WordPress](#phpwordpress)
- [CSS/Styling](#cssstyling)
- [Naming Conventions](#naming-conventions)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Comentários](#comentários)

## 🟨 JavaScript/TypeScript

### Arrow Functions (Obrigatório)
```javascript
// ✅ Correto
const getUserData = async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
};

// ❌ Incorreto
function getUserData(userId) {
  return fetch(`/api/users/${userId}`).then(res => res.json());
}
```

### Declaração de Variáveis
```javascript
// ✅ Correto - const por padrão
const API_URL = 'https://api.example.com';
const userData = await fetchUserData();
let isLoading = false;

// ❌ Incorreto
var userData = await fetchUserData();
let API_URL = 'https://api.example.com'; // Deveria ser const
```

### Naming Conventions
```javascript
// ✅ Correto
const userName = 'john_doe';
const isUserLoggedIn = true;
const API_BASE_URL = 'https://api.example.com';

// Funções
const validateEmail = (email) => { /* ... */ };
const formatCurrency = (amount) => { /* ... */ };

// Classes
class UserService { /* ... */ }
class ApiClient { /* ... */ }

// ❌ Incorreto
const user_name = 'john_doe';
const IsUserLoggedIn = true;
const apiBaseUrl = 'https://api.example.com';
```

### Imports Organizados
```javascript
// ✅ Correto - Ordem: Node modules, internos, relativos
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import axios from 'axios';

import { UserService } from '@/services/UserService';
import { validateEmail } from '@/utils/validation';

import './UserProfile.css';
import { Button } from '../components/Button';
```

### TypeScript
```typescript
// ✅ Correto - Interfaces obrigatórias
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

interface UserServiceProps {
  userId: number;
  onUserUpdate: (user: User) => void;
}

const UserService: React.FC<UserServiceProps> = ({ userId, onUserUpdate }) => {
  // ...
};
```

## ⚛️ React/Next.js

### Componentes
```tsx
// ✅ Correto - PascalCase, props em múltiplas linhas
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  onClick,
  children,
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

### Hooks
```tsx
// ✅ Correto - Hooks sempre no topo
const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const userData = await UserService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ... resto do componente
};
```

### Event Handlers
```tsx
// ✅ Correto - Arrow functions
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  // ...
};

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(event.target.value);
};

// ❌ Incorreto
function handleSubmit(event) {
  // ...
}
```

## 🐘 PHP/WordPress

### Estrutura de Classes
```php
<?php
// ✅ Correto - Namespace e PSR-12
namespace Fibboweb\Plugins\UserManagement;

use Fibboweb\Core\BaseService;
use Fibboweb\Utils\ValidationHelper;

class UserService extends BaseService
{
    private const API_ENDPOINT = 'https://api.example.com/users';

    private ValidationHelper $validator;

    public function __construct(ValidationHelper $validator)
    {
        $this->validator = $validator;
    }

    public function createUser(array $userData): array
    {
        if (!$this->validator->isValidEmail($userData['email'])) {
            throw new InvalidArgumentException('Invalid email format');
        }

        return $this->makeApiRequest('POST', self::API_ENDPOINT, $userData);
    }

    private function makeApiRequest(string $method, string $url, array $data = []): array
    {
        // Implementation
    }
}
```

### WordPress Hooks
```php
// ✅ Correto - Prefixo único do plugin
class UserManagementPlugin
{
    private const PLUGIN_PREFIX = 'fibboweb_user_mgmt';

    public function __construct()
    {
        add_action('init', [$this, 'initPlugin']);
        add_filter('the_content', [$this, 'modifyContent']);
    }

    public function initPlugin(): void
    {
        // Plugin initialization
    }

    public function modifyContent(string $content): string
    {
        return $content;
    }
}
```

## 🎨 CSS/Styling

### CSS Modules / Styled Components
```css
/* ✅ Correto - BEM methodology */
.user-profile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-profile__header {
  font-size: 1.5rem;
  font-weight: 600;
}

.user-profile__content {
  padding: 1rem;
}

.user-profile__content--loading {
  opacity: 0.6;
  pointer-events: none;
}
```

### TailwindCSS
```tsx
// ✅ Correto - Classes organizadas
const Button: React.FC<ButtonProps> = ({ variant, size, children, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

## 📁 Estrutura de Arquivos

### Projeto React/Next.js
```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de UI básicos
│   ├── forms/          # Componentes de formulário
│   └── layout/         # Componentes de layout
├── pages/              # Páginas (Next.js)
├── services/           # Serviços e APIs
├── hooks/              # Custom hooks
├── utils/              # Funções utilitárias
├── types/              # Definições TypeScript
├── styles/             # Estilos globais
└── constants/          # Constantes da aplicação
```

### Plugin WordPress
```
wp-content/plugins/meu-plugin/
├── includes/           # Classes principais
├── admin/             # Funcionalidades admin
├── public/            # Frontend
├── assets/            # CSS, JS, imagens
├── languages/         # Arquivos de tradução
├── templates/         # Templates
└── meu-plugin.php     # Arquivo principal
```

## 💬 Comentários

### JavaScript/TypeScript
```javascript
// ✅ Correto - Comentários JSDoc para funções públicas
/**
 * Valida se o email está em formato válido
 * @param {string} email - Email para validar
 * @returns {boolean} True se válido, false caso contrário
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Comentário inline para lógica complexa
const processUserData = (users) => {
  // Filtra usuários ativos e ordena por data de criação
  return users
    .filter(user => user.isActive)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};
```

### PHP
```php
/**
 * Cria um novo usuário no sistema
 *
 * @param array $userData Dados do usuário
 * @return array Dados do usuário criado
 * @throws InvalidArgumentException Se dados inválidos
 */
public function createUser(array $userData): array
{
    // Valida dados obrigatórios
    if (empty($userData['email'])) {
        throw new InvalidArgumentException('Email é obrigatório');
    }

    return $this->userRepository->create($userData);
}
```

## 📏 Limites e Regras

### Linhas de Código
- **Máximo 100 caracteres** por linha
- **Máximo 50 linhas** por função
- **Máximo 200 linhas** por arquivo (quando possível)

### Complexidade
- **Máximo 3 níveis** de indentação
- **Máximo 5 parâmetros** por função
- **Máximo 10 métodos** por classe

### Performance
- Use `useMemo` e `useCallback` quando necessário
- Evite re-renders desnecessários
- Lazy loading para componentes grandes
- Otimize imagens e assets

---

**Lembre-se**: Código é lido mais vezes do que escrito. Priorize clareza e legibilidade! 📚
