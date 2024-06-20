# Projeto Parquimica - Front

Para a intalação desse projeto é necessário a instalção das seguintes ferramentas:
- [Node.js](https://nodejs.org/pt)
- [yarn](https://yarnpkg.com/getting-started) 

Neste Projeto estamos utilizando a biblioteca Yarn.

Este projeto será executado na máquina localmente, não havendo a necessidade de utilizar Docker no ambiente local.

## Instalação do projeto localmente:
Clone o projeto em qualquer pasta da sua área de trabalho utilizando o CMD e não o powershell (caso seu sistema operacional seja Windows).
```sh
git clone https://github.com/renananchieta/parquimica-api.git
```
```sh
cd parquimica-api/
```

Crie o arquivo .env com a seguinte configuração
```sh
VITE_BASE_URL=http://localhost:8000
VITE_API_URL=http://localhost:8000/api
VUE_APP_DEBUG=true 
```

Instale o projeto
```sh
yarn install
```
Execute o projeto para rodar localmente
```sh
yarn dev
```

# Publicar o projeto no servidor SSH:

No servidor SSH é necessário o Docker para executar a aplicação.

Acessar o servidor com suas credenciais 
```sh
ssh -p 222 <usuario>@site.parquimica.com.br
<senha>
```

Acesse a pasta raíz do projeto front
```sh
cd parquimica-front
```

Verifique o ID do container que está executando a imagem da aplicação
```sh
docker ps
```

A imagem da aplicação estará como neste exemplo
```sh
CONTAINER ID   IMAGE            COMMAND                  CREATED       STATUS       PORTS                                                  NAMES
91c3a0905058   vuejs-app        "/docker-entrypoint.…"   8 hours ago   Up 8 hours   0.0.0.0:8080->80/tcp, :::8080->80/tcp                  vuejs-app-1
```

Pare o container da aplicação com o name vuejs-app-1, utilizando o CONTAINER ID em questão. Os IDs dos containers mudam conforme são reiniciados.
```sh
docker stop 91c
```

Após realizar as alterações necessárias no ambiente local e publicar na branch principal, atualize o projeto no servidor SSH
```sh
git pull origin main
```

Para executar o build do projeto via Docker
```sh
docker build -t vuejs-app .
```

Executar o build da aplicação e expondo a porta 8080
```sh
docker run -it -p 8080:80 --rm --name vuejs-app-1 vuejs-app
```
