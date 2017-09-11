import obj2Query from "libs/params"
import Message from "shared/components/Message"
import { host, port } from "../../../config"
const mode = process.env.NODE_ENV || "DEV"

const helper = {
  resCode: {
    "SUCCESS": 200,
    "ERROR": 500,
    "TIMEOUT": 503
  },
  jsonToString(params) {
    return obj2Query.toQueryString(params)
  },
  /**
   * 压缩图片
   * @param {any} targetImg 目标图片
   * @param {String} type 图片类型
   * @param {Number} type 图片质量
   * return compressImage
   */
  compressImage(targetImg, type = "image/png", quality = 0.94) {
    if (/jpeg|webp/.test(type)) return targetImg
    this.canvas = document.createElement('canvas')
    this.canvas.width = targetImg.width
    this.canvas.height = targetImg.height
      //toDataURL  param1 文件类型 param2 质量  当第二参数为正时 param1 只能是 jpeg|webp
    var compressImage = this.canvas.toDataURL(type, Number(quality));
    const ctx = this.canvas.getContext('2d')
    ctx.drawImage(targetImg, 0, 0)
    delete this.canvas
    return compressImage
  },
  //获取当前时间
  getCurrentTime() {
    const date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds(),
      hh = h < 10 ? `0${h}` : h,
      mm = m < 10 ? `0${m}` : m,
      ss = s < 10 ? `0${s}` : s

    return `${year}/${month}/${day} ${hh}:${mm}:${s}`
  },

  /**
   * get 请求
   * params {url} String 请求地址 支持跨域
   * parmas {params} obj 请求参数 
   */

  async getJson(url, params) {
    const data = await (
      fetch(`${host}${port}/api${url}${params ? '?' + (this.jsonToString(params)) : ''}`, {
        method: "GET",
        mode: "cors",
      })
    )
    return this.sendResponse(data)
  },

  /**
   * post 请求
   * params {url} String 请求地址 支持跨域
   * parmas {params} obj 请求参数 
   * parmas {isForm} boolean 是否是表单提交 表单提交 如:formData 
   */

  async postJson(url, params, isForm = false) {
    const fetchConfig = {
        method: "POST",
        mode: "cors",
        body: isForm ? params : JSON.stringify(params)
      }
      //跨域请求不能自定义头部  ... 否者post请求会变成options请求 第一次遇到。。
      // fetchConfig.headers = {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // }
    const data = (await fetch(`${host}${port}/api${url}`, fetchConfig))
    return this.sendResponse(data)
  },
  //全局处理错误
  sendResponse(data) {
    const { status } = data
    switch (status) {
      case this.resCode['SUCCESS']:
        return data.json()
      case this.resCode['ERROR']:
        return Message.error('服务器发生错误,快通知龙鸿轩(')
      case this.resCode['TIMEOUT']:
        return Message.error('哦豁,请求超时!')
      default:
        return data.json()
    }
  }
}
export default helper