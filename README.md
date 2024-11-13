## Desafio Z1 - Marcelo Petrucelli

## Setup

- MariaDB (MySQL)
- NodeJS
- Usando o framework [NestJS](https://github.com/nestjs/nest) (Express platform)

```
$ mysql -u <user> -p < marcelo_desafio_Z1_2024.dump
$ npm install
```

## Rodar Projeto

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

When you're ready...

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
