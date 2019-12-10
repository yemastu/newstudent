module.exports = {
  // 用户注册
  upload: async (ctx, next) => {
    ctx.body = {
      code: 200,
      filename: `http://localhost:8083/${ctx.req.file.filename}`, //返回文件名
      msg: '上传成功'
    };
    next();
  }
};
