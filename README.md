# Foobar

This is a todo app built with nextjs and react

## Installation

Use the [nvm](https://github.com/nvm-sh/nvm) to install node 18.

```bash
nvm use 18
yarn
```

## Running locally

Create a `.env.local` file
```
DB_URL=mongodb://localhost:27017/todo
```

Running
```bash
docker-compose up -d
yarn dev
```
Open http://localhost:3000/
