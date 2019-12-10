const { User } = require('../model');
const jwt = require('jsonwebtoken');
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
  },
  // 持久化登录验证
  validate: (ctx, next) => {
    let token = ctx.request.headers.authorization;
    console.log(token);
    jwt.verify(token, 'abcd', function(err, decode) {
      if (err) {
        console.log(err);
        ctx.body = {
          code: 400,
          msg: '用户未登录'
        };
      } else {
        //证明用户已经登录 只要用户有操作就要延长过期时间
        ctx.body = {
          code: 200,
          msg: '用户已登录',
          userid: decode.user._id,
          token: jwt.sign({ user: decode.user }, 'abcd', {
            expiresIn: '1h'
          })
        };
        next();
      }
    });
  },

  // 用户登录
  signin: async (ctx, next) => {
    let userinfo = ctx.request.body;
    try {
      let user = await User.findOne(userinfo);
      ctx.body = {
        code: 200,
        userid: user._id,
        msg: '用户已登录',
        token: jwt.sign({ user: user }, 'abcd', {
          expiresIn: '1h'
        })
      };
    } catch (e) {
      ctx.body = {
        code: 400,
        msg: `登录失败，原因是${err}`
      };
    }
  }
};
