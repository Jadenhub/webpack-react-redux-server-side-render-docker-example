## webpack-react-redux-server-side-render-docker-example

Example of an React/Redux application with webpack including server-side rendering.

## Features

* React
* Redux
* Server-Side Rendering 
* styled-component
* Webpack 5
* Docker

## Overview
Webpack compile javascript for usage in server and client via two separate configurations. 

Use [Redux Ducks Pattern](https://github.com/erikras/ducks-modular-redux) in codebase.

## Environment Variable
We use dotenv, so make sure you have this environment variables ready in .evn
```yaml
API_HOST=https://jsonplaceholder.typicode.com
SERVER_PORT=3000
SERVICE_HOST=http://localhost:3000
```

## Quick Start
1. 
```sh
npm install
```

2. 
```sh
npm run dev
```



## Docker

#### Prerequisites
Make sure you have already installed Docker Engine.
```sh
$ docker -v
Docker version 20.10.7, build f0df350
```

#### Run
```sh
  npm run docker:up
```


