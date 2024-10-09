# Mini Sistema Financeiro

Bem-vindo ao **Mini Sistema Financeiro**! Este projeto é uma aplicação web que permite gerenciar transações financeiras, proporcionando funcionalidades como criação, edição, exclusão de transações, visualização de resumos financeiros e autenticação de usuários.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Angular, Angular Material
- **Backend:** Laravel, JWT Authentication
- **Banco de Dados:** MySQL (ou outro de sua preferência)
- **Ferramentas de Teste:** Postman
- **Controle de Versão:** Git

## 🛠️ Pré-requisitos

Antes de iniciar a instalação, certifique-se de ter os seguintes softwares instalados na sua máquina:

- **Node.js** (v14 ou superior) e **npm**
- **Angular CLI**
- **PHP** (v7.4 ou superior)
- **Composer**
- **MySQL** (ou outro banco de dados suportado pelo Laravel)
- **Git**
- **Postman** (para testes de API)

## 📥 Instalação

### 1. Clonar o Repositório

Primeiro, clone este repositório para a sua máquina local:

```bash
git clone https://github.com/seu-usuario/mini-sistema-financeiro.git
```

Navegue até o diretório do projeto:

```bash
cd mini-sistema-financeiro
```

### 2. Configurar o Backend

Assumindo que o backend está localizado na raiz do projeto, siga os passos abaixo:

#### a. Instalar Dependências

Certifique-se de estar no diretório raiz do projeto e execute:

```bash
composer install
```

#### b. Configurar Variáveis de Ambiente

Copie o arquivo .env.example para .env:

```bash
cp .env.example .env
```

Edite o arquivo .env para configurar as credenciais do banco de dados e outras variáveis necessárias:

```env
APP_NAME=MiniSistemaFinanceiro
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nome_do_banco_de_dados
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha


JWT_SECRET=seu_jwt_secret
```

Nota: Para gerar a chave da aplicação e o segredo JWT, execute:

```bash
php artisan key:generate
php artisan jwt:secret
```

#### c. Migrar e Popular o Banco de Dados

Execute as migrações:

```bash
php artisan migrate
```

Opcional: Se houver seeders para dados iniciais, execute:

```bash
php artisan db:seed
```

#### d. Iniciar o Servidor Backend

Inicie o servidor de desenvolvimento do Laravel:

```bash
php artisan serve
```

O backend estará disponível em <http://localhost:8000>.

### 3. Configurar o Frontend

Navegue até a pasta frontend:

```bash
cd frontend
```

#### a. Instalar Dependências

Instale as dependências do projeto Angular:

```bash
npm install
```

#### b. Configurar Variáveis de Ambiente

Se necessário, configure as variáveis de ambiente para apontar para o backend. Abra o arquivo `src/environments/environment.ts` e ajuste a propriedade `apiUrl`:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:8000/api", // Certifique-se de que corresponde à URL do backend
};
```

**Nota:** Se houver configurações específicas para produção, ajuste também o arquivo `environment.prod.ts`.

## ▶️ Executando a Aplicação

### 1. Iniciar o Backend

Certifique-se de que o servidor backend está rodando:

```bash
php artisan serve
```

### 2. Iniciar o Frontend

Em uma nova aba do terminal, navegue até a pasta `frontend` e inicie o servidor de desenvolvimento do Angular:

```bash
cd frontend
ng serve
```

O frontend estará disponível em <http://localhost:4200>.

## 🧪 Testes com Postman

Para testar os endpoints da API, siga os passos abaixo utilizando o Postman:

### 1. Importar a Coleção do Postman

Se houver uma coleção do Postman fornecida no repositório (por exemplo, `MiniSistemaFinanceiro.postman_collection.json`), importe-a no Postman.

### 2. Configurar as Requisições

#### a. Login

- **Endpoint:** `POST http://localhost:8000/api/login`
- **Body:**

```json
{
  "email": "admin@email.com",
  "password": "admin10@"
}
```

- **Descrição:** Autentica o usuário e retorna um token JWT.

#### b. Logout

- **Endpoint:** `POST http://localhost:8000/api/logout`
- **Headers:**
  - `Authorization: Bearer <seu_jwt_token>`
- **Body:** Vazio

#### c. Transações

- **Endpoints:**

  - `GET http://localhost:8000/api/transacoes` - Listar todas as transações.
  - `POST http://localhost:8000/api/transacoes` - Criar uma nova transação.
  - `PUT http://localhost:8000/api/transacoes/{id}` - Atualizar uma transação existente.
  - `DELETE http://localhost:8000/api/transacoes/{id}` - Excluir uma transação.

- **Headers:**
  - `Authorization: Bearer <seu_jwt_token>`

### 3. Executar os Testes

1. **Autenticar-se:**

   Envie uma requisição de login para obter o token JWT.

   Salve o token retornado para usá-lo nas requisições subsequentes.

2. **Testar Operações de Transações:**

   Use o token JWT no header Authorization para autenticar as requisições de criação, edição, exclusão e listagem de transações.

3. **Desautenticar-se:**

   Envie uma requisição de logout para invalidar o token JWT.

> **Dica: Utilize as variáveis de ambiente do Postman para armazenar e reutilizar o token JWT facilmente.**

## 🛡️ Superusuário

O sistema vem com um superusuário pré-configurado para facilitar o acesso e gerenciamento inicial.

- Email: admin@email.com
- Senha: admin10@

> **Importante: Após o primeiro login, recomenda-se alterar a senha do superusuário por motivos de segurança.**

## 📌 Considerações Finais

- **Ambiente de Desenvolvimento:** É altamente recomendável utilizar ferramentas como Docker para facilitar a configuração do ambiente de desenvolvimento, especialmente para o backend e banco de dados.
- **Segurança:** Garanta que as variáveis de ambiente, especialmente as relacionadas a chaves e senhas, estejam protegidas e não sejam expostas publicamente.
- **Manutenção:** Mantenha as dependências do projeto atualizadas para evitar vulnerabilidades e melhorar a performance.
- **Contribuição:** Se desejar contribuir para este projeto, por favor, siga as diretrizes de contribuição presentes no arquivo CONTRIBUTING.md (se disponível).
