# Projeto LAMA

Labenu Music Awards é um show anual de músicas organizado pela própria Labenu que conta com a participação de bandas super famosas nacionais e internacionais! Ele sempre acontece durante uma semana inteira, começando na manhã de segunda e encerrando na noite de domingo.

O LAMA (Labenu Music Awards) está previsto para acontecer no fim do ano e ainda não existe um back-end construído para gerenciar os eventos e ingressos do festival.

Para gerenciar o evento é necessário organizar e centralizar as informações dos shows em um servidor, que então disponibiliza os dados para o website no front-end (que já está criado). Além de controlar os eventos com suas bandas e datas do show, a aplicação também deve gerenciar os ingressos de cada show. A arena tem uma capacidade máxima de 5000 pessoas, portanto deve ser respeitado um limite máximo de ingressos por show.


## Descrição do Projeto

A API consiste em um sistema que gerencia um festival de música, desde a criação e agendamento de shows, até o gerenciamento dos ingressos.


## Entidades (Typescript)

### User (usuário)

Representa os usuários de nossa aplicação. Todo usuário é composto pelas seguintes características:

- `id (string) gerado pela própria aplicação`

- `name (string)`

- `email (string) único por usuário`

- `password: senha hasheada (string)`

- `role: enum "NORMAL" ou "ADMIN"`

### Show

Representa os shows da nossa aplicação. Cada show possui as seguintes características:

- `id (string) gerado pela própria aplicação`

- `band (string) representando o nome da banda`

- `startsAt (Date) representando a data da apresentação`

- `tickets (number) representando os ingressos ainda disponíveis`

## Tabelas (MySQL)

### Lama_Users

- `id VARCHAR(255) e chave primária`
- `name VARCHAR(255) e não-nulo`
- `email VARCHAR(255), não-nulo e único`
- `password VARCHAR(255) e não-nulo`
- `role ENUM “NORMAL” ou “ADMIN” com padrão “NORMAL” não-nulo`

### Lama_Shows

- `id VARCHAR(255) e chave primária`
- `band VARCHAR(255) e não-nulo`
- `starts_at DATE e não-nulo`

### Lama Tickets

- `id VARCHAR(255) e chave primária`
- `show_id VARCHAR(255) e chave estrangeira referenciando a id de Labook_Shows`
- `user_id VARCHAR(255) e chave estrangeira referenciando a id de Labook_Users`


## Instruções

### Instalando as dependências

- `npm install:`
  Instala todas as dependências listadas no `package.json`.

### Populando as tabelas

- `npm run migrations`
  Cria e popula as tabelas com dados mockados de usuários e shows.
  - Esse script deve ser executado apenas uma única vez
  - Se executado uma segunda vez, ele dropa as tabelas e reseta os dados mockados

### Criando o arquivo .env:

Criar o arquivo `.env` e configurar com as informações de seu banco de dados.

```
PORT: 3003
DB_HOST = host
DB_USER = usuario
DB_PASSWORD = senha
DB_NAME = nome-do-banco-de-dados
JWT_KEY = "minha-senha-segura"
JWT_EXPIRES_IN = "24h"
BCRYPT_SALT_ROUNDS = 12
```

### Executar o projeto:

- `npm run dev`:
  Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor `localhost` toda a vez que o projeto for alterado e salvo.

## Funcionalidades

**1. Cadastro de usuário**

- **Método:** `POST `
- **Caminho:** `/users/signup`
- **Entrada:** `name, email, password`
- **Saída:** `mensagem de cadastro de um novo usuário. Ao final, retorna um token de acesso ao sistema.`
- **Validações e regras de negócio:**
  - `name, email e password devem ser fornecidos e serem do tipo string`
  - `name deve possuir ao menos 3 caracteres, enquanto password ao menos 6 caracteres`
  - `email deve ter um formato válido e único, não podendo repetir no banco de dados`


**2. Acesso de usuário**

- **Método:** `POST `
- **Caminho:** `/users/login`
- **Entrada:** `email, password`
  **Saída:** `mensagem de acesso de um usuário cadastrado no endpoint anterior. Ao final, retorna um token de acesso ao sistema.`
- **Validações e regras de negócio:**
  - `email e password devem ser fornecidos e serem do tipo string`
  - `password deve possuir ao menos 6 caracteres`
  - `email deve ter um formato válido`
  - `O usuário com o email fornecido deve existir no sistema`

**3. Cria um novo show (protegido)**

- **Método:** `POST `
- **Caminho:** `/shows/create`
- **Entrada:** `token de acesso, band, startsAt`
  **Saída:** `mensagem de show criado com sucesso e os dados do show.`
- **Validações e regras de negócio:**
  - `a data do show não pode ser anterior ao início do festival (5 de dezembro)`
  - `só pode existir um show por dia durante o evento`
- **Observação:**- `endpoint acessível apenas para ADMINS`

**4. Buscar shows**

- **Método:** `GET `
- **Caminho:** `/shows/all`
- **Entrada:** `nenhuma`
  **Saída:** `uma lista com todos os shows agendados`
- **Validações e regras de negócio:**
  - `dentre as informações dos shows, deve existir também o número de ingressos disponíveis (iniciando em 5000)`

**5. Criar reserva de ingressos (protegido)**

- **Método:** `POST`
- **Caminho:** `/shows/ticket/:id`
- **Entrada:** `token de acesso, id do show a ser reservado`
  **Saída:** `mensagem de reserva realizada com sucesso`
- **Validações e regras de negócio:**
  - `id do show reservado deve existir no banco de dados`
  - `uma mesma pessoa só pode reservar um ingresso para cada show`
  - `deve ser respeitado o limite de 5000 ingressos por show`
- **Observação:**- `endpoint acessível apenas para ADMINS`

**6. Remover reserva de ingressos (protegido)**

- **Método:** `DELETE`
- **Caminho:** `/shows/ticket/:id`
- **Entrada:** `token de acesso, id do show a ser reservado`
  **Saída:** `mensagem de reserva removida com sucesso`
- **Validações e regras de negócio:**
  - `id do show reservado deve existir no banco de dados`
  - `a pessoa já deve ter reservado o ingresso`
- **Observação:**- `endpoint acessível apenas para ADMINS`


## Documentação (links)

- [Postman](https://documenter.getpostman.com/view/21578696/2s8ZDcxJqh)

## Coverage
![coverage_LAMA](https://user-images.githubusercontent.com/104534121/214437563-e618a77e-5c44-4309-b74b-be6d265f2e91.png)


## Tecnologias Utilizadas

- NodeJS
- TypeScript
- MySQL
- Knex
- Express
- Cors
- JWT
- BcryptJS
- Markdown
- Jest

## Autor

- - [Gabriel Wenchenck](https://github.com/gabrielwenchenck)

