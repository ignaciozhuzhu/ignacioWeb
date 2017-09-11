const express = require('express')
const router = express.Router()
const fs = require("fs")
const debug = require('debug')('admin')
const moment = require('moment')
const { tArticle } = require("../db/connect")
const { host, port, staticPath, tableFields, companyName, adminEmail } = require("../../config")
const sendEmail = require("../utils/sendEmail")

//获取文章列表
router.get('/articleList', async(req, res, next) => {
  const pageSize = 5
  const {
    pageIndex = 1,
  } = req.query

  const articleList = await tArticle.find({})
    .sort({ publishDate: -1 })
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)

  const count = ~~((await tArticle.find({}).count()) / pageSize) + 1

  debug(`[获取文章列表成功],页码[${pageIndex}] 每页个数[${pageSize}]`)
  res.data = {
    articleList,
    count
  }
  debug('文章列表获取成功')
  next()
})

/**
 * 审核文章
 * @param {id}  String 文章id
 * @param {title}  String 文章标题
 * @param {email}  String 作者邮箱
 * @param {publishDate}  String 发表日期
 */
router.post('/approve', async(req, res, next) => {

  const { id, title, publishDate, email = adminEmail } = req.body
  debug(`[文章审核]: id :${id}, 标题:${title} 邮箱:${email} 日期: ${publishDate}`)
  const date = moment(publishDate).format("YYYY-MM-DD HH:mm:ss")
  await tArticle.update({ _id: id }, { $set: { approve: true } })
  debug('文章审核成功!')
  await sendEmail.sendEmail({
    to: email,
    subject: `【${companyName}】文章审核通过通知!`,
    html: `<h3 style="font-weight:500;">您于 ${date} 发表的文章【${title}】已审核通过,请前往<a href="${host}">${companyName}</a>查看~</h3>`
  })
  res.data = {
    success: 1
  }
  next()
  debug('[文章审核通过,邮箱发送成功] 收件人:', email)

})

module.exports = router