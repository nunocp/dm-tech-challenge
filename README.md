# DM Tech Challenge

Projeto implementado para um desafio backend cujo objetivo é construir uma API que busque receitas e gifs relacionados integrando as APIs da RecipePuppy (http://www.recipepuppy.com/about/api/) e da Giphy (https://developers.giphy.com/docs/) para obter os dados necessários. Uma lista de ingredientes é fornecida em uma chamada GET, que retorna um objeto JSON no formato proposto pelo desafio.

## Desenvolvimento

As tecnologias utilizadas foram:

- **Node.js**
- **Axios** (Cliente)
- **Express.js** (Server)
- **Jest** (Testes)
- **Eslint** (Linter)
- **Docker**

## Executando

1. Primeiro, instale as últimas versões do [Docker](https://www.docker.com/) e [Node.js](https://nodejs.org).

2. Na raiz do projeto, construa a imagem executando: `docker build -t dm-server .`

3. Renomeie o arquivo `.env.example` para `.env` e insira nele, pelo menos, uma [***GIPHY_KEY***](https://developers.giphy.com/docs/sdk) válida. *SERVER_PORT* pode permanecer padrão se desejar.

4. A API ficará disponível em `http://localhost:{SERVER_PORT}/recipes/`, podendo chamá-la assim (exemplo):\
\
`http://localhost:4000/recipes/?i=onion,tomato`

5. Execute o contêiner seguindo: `docker run -p {HOST_PORT}:{SERVER_PORT} dm-server`\
\
Exemplo: `docker run -p 4000:4000 dm-server`

## Testando

1. Para testar, é necessário ter o [Node.js](https://nodejs.org).

2. Na raiz do projeto, instale as dependências necessárias executando: `npm install`

3. Rode o contêiner seguindo as instruções anteriores em *Executando* e execute: `npm test`

## Controle de Qualidade (Linter)

1. Para rodar o linter, é necessário ter o [Node.js](https://nodejs.org).

2. Na raiz do projeto, instale as dependências necessárias executando: `npm install`

1. Execute o linter: `npx eslint . .`