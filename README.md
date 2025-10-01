Приложение реализовано с использованием [Next.js](https://nextjs.org)

### Запуск приложения

Next.js.
Локальный запуск.

```bash
yarn dev
```

Локально в режиме production

```bash
NODE_ENV=production yarn start
```

В dev используется
yarn 1.22.22

```bash
node версии v23.1.0
```

## Использование DOCKER

Сборка:
`docker-compose build`

Запуск:
`docker-compose up`
или
`docker-compose up -d`
c env файлом:
`docker-compose --env-file ./.env.production up`

Остановить
`docker-compose stop`

Локальная пересборка:
`docker compose up --build --force-recreate`

## Внимание!

### Для системы координат используется srid = 4326
