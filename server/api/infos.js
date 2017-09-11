const express = require('express')
const router = express.Router()
const config = require('../../config')
const fs = require("fs")
const debug = require('debug')('article')
const { tArticle, tComment, tInfos } = require("../db/connect")
const momnet = require("moment")
const sendEmail = require("../utils/sendEmail")

/**
 * 文章列表
 * @param {pageIndex} 页码      default 1
 * @param {pageSize}  每页个数   default 3
 */

router.get('/lists', async(req, res, next) => {
  const pageSize = 800
  const { room } = req.query
  const {
    pageIndex = 1,
  } = req.query

  debug('[roomid]:', room)
  let articleLists
  if (room != 0)
    articleLists = await tInfos.find({ room: room })
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
  else articleLists = await tInfos.find({})
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)

  const count = ~~((await tInfos.find({}).count()) / pageSize) + 1

  debug(`[获取文章列表成功],页码[${pageIndex}] 每页个数[${pageSize}]`)
  res.data = {
    count,
    articleLists
  }
  next()
})

/**
 * 文章点赞
 * @param {isLike} Boolean  点赞 true or 取消赞 false
 * @param {id}  String  文章id
 */
router.post("/update", async(req, res, next) => {
  let { No, room, SN, buyTime, totalPrice, unitPrice, rentLive, isCheck, isReserve, isPark, isNear } = req.body
  debug(req.body)
  try {
    if (!totalPrice) totalPrice = 0;
    if (!unitPrice) unitPrice = 0;
    /*    let likeNum = (await tArticle.find({ _id: id }, { like: 1 }))[0].like

        if (isLike === true) {
          likeNum++
        } else if (isLike === false) {
          likeNum--
        }
        debug('喜欢量', likeNum)*/
    const data = await tInfos.update({ room: room, No: No }, { $set: { "SN": SN, "buyTime": buyTime, "totalPrice": totalPrice, "unitPrice": unitPrice, "rentLive": rentLive, "isCheck": isCheck, "isReserve": isReserve, "isPark": isPark, "isNear": isNear } })
    debug(data)
    debug('[操作成功]')
    res.data = {
      success: 1
    }
    next()
  } catch (error) {
    next(error)
  }

})


module.exports = router