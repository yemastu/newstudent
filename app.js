const Koa = require('koa'); // Koa 为一个class
const path = require('path');
const Router = require('koa-router'); // koa 路由中间件
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const static = require('koa-static');
const router = new Router();
const app = new Koa();
app.use(bodyParser());
app.use(cors());
app.use(static(path.resolve(__dirname, 'uploads')));

const user = require('./router/user');
const file = require('./router/file');
app
  .use(router.routes(), router.allowedMethods())
  .use(user.routes())
  .use(file.routes());

module.exports = app;
