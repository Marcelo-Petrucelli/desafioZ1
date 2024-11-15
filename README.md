## Desafio Z1 - Marcelo Petrucelli

## Setup

- MariaDB (MySQL)
- NodeJS
- Framework [NestJS](https://github.com/nestjs/nest) (Express platform)
- Mikro ORM
- Passport com BasicAuth e JWT

## Rodar Projeto

```bash
$ npm install
```

Editar .env com as variáveis de ambiente/acesso ao banco
```bash
$ cp .env.dist .env.prod
$ cp .env.dist .env.dev
$ vim .env.dev
```

Rodar backend
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Criei uma rota: ```/forceSchemaRefresh``` para ser acessada que irá rodar a ```Migration inicial``` e criar alguns usuário, seus endereços e alguns produtos.

## Rodar tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Recursos e Funcionalidades

Check out a ....

## Sobre o Desenvolvimento

O projeto está propositalmente organizado entre pastas por funcionalidade e, seus arquivos internos, com nomes representando sua hierarquia interna.

Em alguns casos, como entidades, a criação de pastas não foi feita já que multiplas entidades são utilizadas em multiplas funcionalidades.

Em outros casos, situações como controladoras, casos como ```controllers/auth/auth.controller.ts``` acaba ocorrendo e, apesar de parecerem redundates, evitam colisões de nomes nos arquivos, caso sejam referenciados diretamente ou através de caminhos relativos.

## License

Nest, and this whole project are [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).