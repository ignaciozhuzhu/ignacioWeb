const mongoose = require('mongoose')
const debug = require('debug')('music-schema')

const musicSchema = new mongoose.Schema({
  name: String, //音乐名
  src: String, //路径
  cover: String, //图片路径
  desc: String //描述
}, {
  collection: "music"
})

const articleSchema = new mongoose.Schema({
  title: String, //文章标题
  content: String, //文章内容
  author: String, //作者
  publishDate: { //发表日期
    type: Date,
    default: Date.now
  },
  pageView: Number, //点击量
  like: Number, //喜欢数量
  approve: Boolean, //是否审核通过
  email: String, //作者邮箱  用来通知作者文章是否通过
  category: Array
}, {
  collection: "article"
})

const commentSchema = new mongoose.Schema({
  articleId: String, //文章id
  commentName: String, //姓名
  commentEmail: String, //邮箱
  commentContent: String, //内容
  like: String, //点赞量
  device: String, //设备
  publishDate: { //发布日期
    type: Date,
    default: Date.now
  }
}, {
  collection: "comment"
})

const infosSchema = new mongoose.Schema({
  No: Number,
  room: String,
  SN: String,
  buyTime: { //购买日期
    type: Date,
    default: Date.now
  },
  totalPrice: Number,
  unitPrice: Number,
  rentLive: String,
  isCheck: String,
  isReserve: String,
  isPark: String,
  isNear: String,
}, {
  collection: "infos"
})


module.exports = {
  musicSchema,
  articleSchema,
  commentSchema,
  infosSchema
}