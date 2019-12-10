const { User } = require('../model');
module.exports = {
  // 用户注册
  register: async (ctx, next) => {
    let userinfo = ctx.request.body;
    try {
      let user = await User.findOne({ username: userinfo.username });
      if (user) {
        ctx.body = {
          code: 400,
          msg: `注册失败，用户名已存在`
        };
      } else {
        user = await User.create(userinfo);
        ctx.body = {
          code: 200,
          msg: `注册成功，用户名是${user.username}`
        };
      }
    } catch (err) {
      ctx.body = {
        code: 400,
        msg: `注册失败，原因是${err}`
      };
    }
    next();
  }
};
