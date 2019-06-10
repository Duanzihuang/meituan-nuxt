# Nuxt构建的美团网

> My riveting Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

### Nuxt项目Koa代码中支持`import`语法

```
1、更改package.json中的启动脚本 【在后面加上 --exec babel-node】
	"dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server --exec babel-node",
	"start": "cross-env NODE_ENV=production node server/index.js --exec babel-node",
	
2、项目根目录创建 .babelrc 配置文件，并配置代码
	{
      "presets":["@babel/preset-env"]
    }

```

# knowledge
```
koa-passport
```

### Redis

> 开启Redis服务

```
redis-server
```

