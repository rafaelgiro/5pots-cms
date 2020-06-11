# 5Pots

> Portal de notícias de League of Legends

![5PotsSite](https://imgur.com/n7KVuuj.png)

<br>

## 🚀 Getting Started

O projeto está em containers, por isso instale o [Docker](https://docs.docker.com/get-started/) de acordo com seu sistema operacional. Para Windows 10 home ou menor, utilize o [Docker Toolbox (Windows 10 home ou menor)](https://docs.docker.com/toolbox/toolbox_install_windows/).

Clone o projeto

```
git clone https://github.com/RafaelGiro/5pots
```

Entre na pasta

```
cd 5pots
```

Builde as imagens do Docker utilizando o Docker Compose

```
docker-compose -f docker-compose-dev.yml build
```

Suba as imagens

```
docker-compose -f docker-compose-dev.yml up
```

acesse o http://localhost (ou o IP que o Docker Toolbox te der) e se divirta :D. Não se esqueça de ir para a branch "dev" para contribuir com o desenvolvimento do projeto.

<br>

## ⚙️ Feito com

- Front-end
  - [React](https://pt-br.reactjs.org/)
    - [React Dom](https://pt-br.reactjs.org/docs/react-dom.html)
    - [React Router Dom](https://reacttraining.com/react-router/web/guides/quick-start)
  - [SCSS](https://sass-lang.com/guide)
- Back-end
  - [Node.js](https://nodejs.org/en/)
    - [Express](https://expressjs.com/pt-br/)
  - [Docker](https://www.docker.com/)
    - [Docker Compose](https://docs.docker.com/compose/)
    - [Docker Toolbox (Windows 10 home ou menor)](https://docs.docker.com/toolbox/toolbox_install_windows/)
      <br>
  - [NGINX](https://www.nginx.com/)

## ✔️ À fazer

Verifique nossos [issues](https://github.com/RafaelGiro/5pots/issues)!

<br>

## ⚡️ Contribuindo

1. Fork o projeto (<https://github.com/yourname/yourproject/fork>)
2. Crie uma branch com nome da sua funcionalidade (`git checkout -b feature/fooBar`)
3. Commit suas mudanças (`git commit -am 'Add some fooBar'`)
4. Push a branch (`git push origin feature/fooBar`)
5. Crie um Pull Request
