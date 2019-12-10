const Router = require('koa-router');
const user = new Router({
  prefix: '/user'
});
const userContorl = require('../control/user');
// 用户注册
user.post('/register', userContorl.register);
// 用户登录
user.post('/signin', userContorl.signin);
// 持久化登录验证
user.post('/validate', userContorl.validate);
module.exports = user;
