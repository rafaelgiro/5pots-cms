# 5Pots

> Portal de notícias de League of Legends

![5PotsSite](https://imgur.com/n7KVuuj.png)

<br>

## 🚀 Getting Started

O projeto é um monorepo com Yarn Workspaces. O font e back do site 5pots.com está na pasta `/app`, e em `/packages` os pacotes npm que originaram dentro do projeto e foram modularizados.

Instale o [Yarn](https://classic.yarnpkg.com/en/docs/install/) junto com o [Node](https://nodejs.org/en/). Para usar o banco de dados local, apenas instale o [MongoDB](https://docs.mongodb.com/manual/installation/) no seu PC.

Clone o projeto

```
git clone https://github.com/RafaelGiro/5pots
```

Entre na pasta

```
cd 5pots
```

Instale as dependências

```
yarn
```

Para rodar o site (front/back) utilize o comando:

```
yarn start
```

---

#### Variáveis de ambiente

Antes de rodar a primeira vez o projeto, ainda é necessário adicionar as variáveis de ambiente:

##### Client
Renomeie o arquivo `.env.example` para `.env` na pasta **/apps/client** e inclua suas chaves.
Para o frontend é necessário ter uma chave do [Google recaptcha](https://www.google.com/recaptcha/about/).

```env
NEXT_PUBLIC_RECAPTCHA=
API_URI=http://localhost:5000/
NEXT_PUBLIC_API_URI=http://localhost:5000/
```

##### Server
Renomeie o arquivo `.env.example` para `.env` na pasta **/apps/server** e inclua suas chaves.
Para o servidor, é necessário ter chave nos seguintes serviços:
| [Google recaptcha](https://www.google.com/recaptcha/about/) | [Google OAuth2](https://developers.google.com/identity/protocols/oauth2) | [Facebook OAuth2](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/) | [B2 Cloud Storage](https://www.backblaze.com/b2/cloud-storage.html) | [Sendgrid](https://sendgrid.com/docs/api-reference/)

```env
MONGO_URI=mongodb://localhost:27017/5pots-dev
NODE_HOST=localhost
NODE_PORT=5000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
B2_KEY_ID=
B2_APP_KEY=
B2_BUCKET_ID=
SENDGRID_API_KEY=
SENDGRID_EMAIL=
```

#### Chaves RSA
Para a autenticação é necessário gerar as chaves RSA. Existe um script dentro de `/apps/server/lib/config/keys`, para gerar as chaves, vamos apenas rodar os seguintes comandos:

```
cd apps/server
yarn generate-keys
```

---

## ⚙️ Feito com

- Front-end

  - [React](https://pt-br.reactjs.org/)

  - [Nextjs](https://nextjs.org/)

  - [SCSS Modules](https://sass-lang.com/guide)

- Back-end

  - [Node.js](https://nodejs.org/en/)

  - [Express](https://expressjs.com/pt-br/)

  - [MongoDB](https://www.mongodb.com/)

## ✔️ À fazer

Verifique nossos [issues](https://github.com/RafaelGiro/5pots/issues)!

---

## ⚡️ Contribuindo

1. Clone o projeto

2. Crie uma branch com nome da sua funcionalidade (`git checkout -b feature/fooBar`)

3. Commit suas mudanças (`git commit -am 'Add some fooBar'`)

4. Push a branch (`git push origin feature/fooBar`)

5. Crie um Pull Request
