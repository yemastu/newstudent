const Router = require('koa-router');
const user = new Router({
  prefix: '/user'
});
const userContorl = require('../control/user');
// 用户注册
user.post('/register', userContorl.register);
module.exports = user;
