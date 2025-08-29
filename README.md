# Biblioteca Mauá Web

Sistema de biblioteca digital integrado com autenticação de usuários usando MySQL e MongoDB.

## 🗄️ Arquitetura do Banco de Dados

Este projeto usa uma arquitetura **híbrida** com dois bancos de dados:

### MySQL (Knex.js)
- **Tabela `pessoas`**: Dados principais dos usuários e autenticação
- **Tabela `Account`** (opcional): Dados de conta complementares

### MongoDB (Mongoose)
- **Collection `users`**: Dados de usuário para autenticação MongoDB
- **Collection `profiles`**: Perfis completos dos usuários com projetos, educação, etc.
- **Collection `books`**: Livros da biblioteca com metadados avançados
- **Collection `storages`**: Arquivos (PDFs, imagens, etc.)

## 🚀 Setup do Projeto

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Arquivo `.env` já configurado com MySQL AlwaysData

### 3. Setup do Banco de Dados
```bash
# Verificar e criar tabelas MySQL
npm run setup-db

# Verificar estrutura das tabelas
npm run check-db

# Testar sistema completo
npm run test-system
```

### 4. Iniciar o Servidor
```bash
# Desenvolvimento com auto-reload
npm run dev

# Produção
npm start
```

## ✅ Problemas Corrigidos

### 🔧 Erro: "Unknown column 'undefined' in 'VALUES'"
**Causa**: SQL raw com interpolação de strings causava valores `undefined`
**Solução**: Implementado prepared statements usando Knex.js

### 🔧 Inconsistência de Tabelas
**Causa**: Referências mistas entre "pessoas" e "Pessoa"
**Solução**: Padronizado para usar "pessoas" (minúsculo, plural)

### 🔧 Comentários Incorretos
**Causa**: Código mencionava SQLite mas usava MySQL
**Solução**: Todos os comentários atualizados para MySQL

### 🔧 Sistema de Livros Expandido
**Implementado**: Schema completo do Book com novos campos:
- Autor referenciando Profile
- Sistema de comentários e avaliações
- Upload de PDF, capa e ícones
- Tags e documentações
- Estatísticas (views, downloads, likes)

## 📊 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor desenvolvimento |
| `npm run setup-db` | Criar tabelas MySQL |
| `npm run check-db` | Verificar tabelas |
| `npm run test-system` | Testes completos |

## 🌐 Endpoints

### Autenticação (`/auth`)
- `POST /auth/signup` - Criar usuário
- `POST /auth/signin` - Login
- `GET /auth/users` - Listar usuários

### Biblioteca (`/books`)
- `GET /books` - Listar livros
- `GET /books/new` - Formulário novo livro
- `POST /books` - Criar livro (com upload)
- `GET /books/:id` - Detalhes do livro
- `GET /books/:id/download` - Download PDF

## 🎯 Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **MySQL**: Knex.js para queries
- **MongoDB**: Mongoose ODM
- **Upload**: Multer para arquivos
- **Auth**: bcryptjs, JWT
- **Views**: EJS templates
- **CSS**: Bootstrap

## 🔐 Segurança Implementada

- ✅ Senhas hasheadas (bcryptjs)
- ✅ Prepared statements (SQL injection)
- ✅ Validação de entrada
- ✅ Upload seguro de arquivos
- ✅ Tratamento de erros

---

**Sistema totalmente funcional e corrigido!** 🎉

## AUTOR 
<a href="https://github.com/elbotechia" target="_blank">@ELBotechia</a>

