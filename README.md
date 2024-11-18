# Desafio Z1 - Marcelo Petrucelli

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

Criei uma rota: ```/forceSchemaRefresh?force=false``` para ser acessada que irá rodar a ```Migration inicial``` e criar alguns usuário, seus endereços e alguns produtos.

## Rodar tests

```bash
# unit tests
$ npm run test

# e2e tests //TODO
$ npm run test:e2e

# test coverage //TODO
$ npm run test:cov
```

## Sobre o Desenvolvimento

O projeto está propositalmente organizado entre pastas por funcionalidade e, seus arquivos internos, com nomes representando sua hierarquia interna.

Em alguns casos, como entidades, a criação de pastas não foi feita já que multiplas entidades são utilizadas em multiplas funcionalidades (mas não haveriam problemas em separá-las por pastas também).

Em outros casos, situações como controladoras e DTOs (Data Transfer Objects), casos como ```controllers/auth/auth.controller.ts``` acabam ocorrendo e, apesar de parecerem redundates, evitam colisões de nomes nos arquivos, caso sejam referenciados diretamente ou através de caminhos relativos.

## Recursos e Funcionalidades

## > Auth
Esta é a única rota que não requer um JWT no header "Authorization: Bearer TOKEN". Todas as outras rotas necessitam do JWT.
### ```Get - GET```
#### Retorno esperado - ```200 - OK```
```json
{
	"access_token": "TOKEN"
}
```

## > Product

### ```Product Get - GET - /:id```
#### Retorno esperado - ```200 - OK```
```json
{
	"id": 2,
	"name": "Produto2",
	"description": "Descrição do Produto 2",
	"weight": 1.6,
	"sellingPrice": 5.8
}
```

----
### ```Product List - GET - /list```
#### Retorno esperado - ```200 - OK```
```json
[
	{
		"id": 1,
		"name": "Produto1",
		"description": "Descrição do Produto 1",
		"weight": 10.2,
		"buyingPrice": 10.5,
		"sellingPrice": 21,
		"stock": 10
	},
	{
		"id": 2,
		"name": "Produto2",
		"description": "Descrição do Produto 2",
		"weight": 1.6,
		"buyingPrice": 5.5,
		"sellingPrice": 5.8,
		"stock": 20
	},
	{
		"id": 3,
		"name": "Produto3",
		"description": "Descrição do Produto 3",
		"weight": 3.2,
		"buyingPrice": 2.5,
		"sellingPrice": 20.3,
		"stock": 15
	},
	{
		"id": 4,
		"name": "Produto4",
		"description": "Descrição do Produto 4",
		"weight": 7.5,
		"buyingPrice": 0.5,
		"sellingPrice": 0.2,
		"stock": 0
	}
]
```

----
### ```Product Create - POST - /create```
#### Corpo esperado
```json
{
	"name": "Produto5",
	"description": "Descrição do Produto 5",
	"weight": 12.5,
	"buyingPrice": 1.5,
	"sellingPrice": 0.75,
	"stock": 12
}
```
#### Retorno esperado - ```201 - CREATED```

----
### ```Product Remove - DELETE - /remove/:id?force=false```
#### Retorno esperado - ```202 - ACCEPTED```

## > Address

### ```Address Get - GET - /:id```
#### Retorno esperado - ```200 - OK```
```json
{
	"id": 2,
	"cep": "01307001",
	"state": "SP",
	"city": "São Paulo",
	"district": "Consolação",
	"street": "Rua Frei Caneca",
	"number": 569,
	"ownerId": 2
}
```

----
### ```Address List - GET - /list```
#### Retorno esperado - ```200 - OK```
```json
[
	{
		"id": 1,
		"cep": "13560001",
		"state": "SP",
		"city": "São Carlos",
		"district": "Centro",
		"street": "Avenida São Carlos",
		"number": 10,
		"ownerId": 1
	},
	{
		"id": 2,
		"cep": "01307001",
		"state": "SP",
		"city": "São Paulo",
		"district": "Consolação",
		"street": "Rua Frei Caneca",
		"number": 569,
		"ownerId": 2
	},
	{
		"id": 3,
		"cep": "20531590",
		"state": "RJ",
		"city": "Rio de Janeiro",
		"district": "Alto da Boa Vista",
		"street": "Estrada da Cascatinha",
		"number": 99,
		"ownerId": 3
	},
	{
		"id": 4,
		"cep": "85859899",
		"state": "PR",
		"city": "Foz do Iguaçu",
		"district": "Parque Nacional do Iguaçu",
		"street": "Rodovia BR-469",
		"number": 11656,
		"ownerId": 4
	}
]
```

----
### ```Address Create - POST - /create```
#### Corpo esperado
```json
{
	"cep": "13567480",
	"state": "SP",
	"city": "São Carlos",
	"district": "Lot. Albertini",
	"street": "Rua Ângelo Carduchi",
	"number": 65,
	"ownerId": 2
}
```
#### Retorno esperado - ```201 - CREATED```

----
### ```Address Remove - DELETE - /remove/:id```
#### Retorno esperado - ```202 - ACCEPTED```

## > Cart

### ```Cart Get - GET - /```
#### Retorno esperado - ```200 - OK```
```json
{
	"id": 1,
	"discount": 0,
	"products": [
		{
			"id": 1,
			"product": {
				"id": 1,
				"name": "Produto1",
				"description": "Descrição do Produto 1",
				"weight": 10.2,
				"sellingPrice": 21
			},
			"quantity": 2
		},
		{
			"id": 2,
			"product": {
				"id": 2,
				"name": "Produto2",
				"description": "Descrição do Produto 2",
				"weight": 1.6,
				"sellingPrice": 5.8
			},
			"quantity": 1
		}
	],
	"ownerId": 1
}
```

----
### ```Cart Create - POST - /create```
Aqui o ```ownerId``` é opicional. Se não for informado o carrinho é adicionado ao usuário constando no Token (logado).
#### Corpo esperado
```json
{
	"ownerId": 1,
	"discount": 0,
	"productIds": [1, 1, 2]
}
```
#### Retorno esperado - ```201 - CREATED```

----
### ```Cart AddProduct - POST - /add```
Aqui o ```id``` é opicional. Se não for informado o produto é adicionado ao carrinho do usuário constando no Token (logado). Além disso, neste caso que o carrinho é do usuário, caso ele não tenha sido criado, ele é criado e o produto inserido.
#### Corpo esperado
```json
{
    "id": 1,
	"productIds": [1, 1, 2]
}
```
#### Retorno esperado - ```201 - CREATED```

----
### ```Cart Remove - DELETE - /remove```
Aqui o ```id``` é opicional. Se não for informado o carrinho é removido do usuário constando no Token (logado).
#### Corpo esperado
```json
{
	"id": 1,
	"productIds": [1, 1, 2]
}
```
#### Retorno esperado - ```202 - ACCEPTED```

## > Order

### ```Order Get - GET - /:id```
#### Retorno esperado - ```200 - OK```
```json
{
	"id": 1,
	"total": 47.8,
	"paymentMethod": "pix",
	"products": [
		{
			"id": 1,
			"product": {
				"id": 1,
				"name": "Produto1",
				"description": "Descrição do Produto 1",
				"weight": 10.2,
				"sellingPrice": 21
			},
			"quantity": 2
		},
		{
			"id": 2,
			"product": {
				"id": 2,
				"name": "Produto2",
				"description": "Descrição do Produto 2",
				"weight": 1.6,
				"sellingPrice": 5.8
			},
			"quantity": 1
		}
	]
}
```

----
### ```Order List - GET - /list```
#### Retorno esperado - ```200 - OK```
```json
[
	{
		"id": 1,
		"total": 47.8,
		"paymentMethod": "pix",
		"products": [
			{
				"id": 1,
				"product": {
					"id": 1,
					"name": "Produto1",
					"description": "Descrição do Produto 1",
					"weight": 10.2,
					"sellingPrice": 21
				},
				"quantity": 2
			},
			{
				"id": 2,
				"product": {
					"id": 2,
					"name": "Produto2",
					"description": "Descrição do Produto 2",
					"weight": 1.6,
					"sellingPrice": 5.8
				},
				"quantity": 1
			}
		]
	},
	{
		"id": 2,
		"total": 46.4,
		"paymentMethod": "pix",
		"products": [
			{
				"id": 3,
				"product": {
					"id": 3,
					"name": "Produto3",
					"description": "Descrição do Produto 3",
					"weight": 3.2,
					"sellingPrice": 20.3
				},
				"quantity": 2
			},
			{
				"id": 4,
				"product": {
					"id": 2,
					"name": "Produto2",
					"description": "Descrição do Produto 2",
					"weight": 1.6,
					"sellingPrice": 5.8
				},
				"quantity": 1
			}
		]
	}
]
```

----
### ```Order Place - POST - /place```
#### Corpo esperado
```json
{
	"paymentMethod": "pix"
}
```
#### Retorno esperado - ```201 - CREATED```

## License

Nest, and this whole project are [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).