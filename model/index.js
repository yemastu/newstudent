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

module.exports = {
  User
};
