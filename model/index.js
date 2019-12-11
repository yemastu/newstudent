let mongoose = require('mongoose');
let { dburl } = require('../config');
const Schema = mongoose.Schema;
let db = mongoose.createConnection(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true
});
db.then(
  data => {
    console.log('连接成功');
  },
  err => {
    console.log('连接失败');
    console.log(err);
  }
);
let userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});
//用户模块
const User = db.model('user', userSchema);
let userInfo = new Schema({
  info: String,
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});
const UserInfo = db.model('userinfo', userInfo);
// User.create({ username: 'lilei', password: '1123' }, function(err, doc) {
//   let _id = doc._id;
//   console.log('执行一次');
//   UserInfo.create({
//     info: '这是一条个人信息',
//     userid: _id
//   });
// });
module.exports = {
  User,
  UserInfo
};
