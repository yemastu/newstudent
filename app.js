const Koa = require('koa'); // Koa 为一个class
const Router = require('koa-router'); // koa 路由中间件
const bodyParser = require('koa-bodyparser');
const router = new Router();
const app = new Koa();
app.use(bodyParser());

const user = require('./router/user');
app.use(router.routes()).use(user.routes());

app.listen(8083, () => {
  console.log('This server is running at http://localhost:' + 8083);
});
