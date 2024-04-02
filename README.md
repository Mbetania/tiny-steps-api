# Tiny Steps API

## Technology stack

- [TypeScript](https://www.typescriptlang.org/docs/)
- [NPM](https://www.npmjs.com/)
- [NestJS](https://docs.nestjs.com/)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/es)

## Pre requirements

- **Install NestJS globally.**
- **Install MongoDB Compass [here](https://www.mongodb.com/es/products/tools/compass)**
- **Install Docker and Docker-compose**

## Set environment variables

Copy the `.env.example` file and replace values for local environment

```bash
cp .env.example .env
```

## Up docker-compose

In local development we need to up docker-compose **local**.
The docker-compose has `mongodb` image.

```bash
docker-compose -f ./local-docker-compose.yml up -d
```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
