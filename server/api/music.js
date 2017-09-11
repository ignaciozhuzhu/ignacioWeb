const express = require('express')
const router = express.Router()
const config = require('../../config')
const fs = require("fs")
const Path = require('path')
const debug = require('debug')('music')
const { tMusic } = require("../db/connect")
const multiparty = require('multiparty')
const { host: HOST, port: PORT, staticPath } = config

/**
 * 获取音乐
 */
router.get('/getMusic', async(req, res, next) => {
  const { cover, name, src, desc } = await tMusic.findOne()
  debug('音乐文件读取成功')
  res.data = {
    name: name || "",
    image: cover || "",
    src: src || "",
    desc: desc || ""
  }
  next();
})

//获取音乐信息  只有一首歌 没存数据库 直接io操作
/*function getMusicInfo(fs) {
  const musicFile = fs.readdirSync(`${staticPath}/music`)
  debug('音乐文件读取成功')
  const src = musicFile.find(item => /\.mp3/.test(item)) //音乐文件路径
  const imageSrc = musicFile.find(item => /.*\.(jpg|jpeg|gif|png)/.test(item)) //图片路径
  const name = src && src.replace(/(.*)\.mp3/, '$1') || "" //音乐名字
  debug(`[musicSrc]:${src}`)
  debug(`[musicImgSrc]:${imageSrc}`)
  debug(`[name]:${name}`)
  return {
    src,
    imageSrc,
    name
  }
}*/
//上传音乐
const fieldsConfig = {
  name: "audioName",
  img: "audioImg",
  file: "audioFile"
}

/**
 * 上传音乐               
 */
router.post('/uploadMusic', async(req, res, next) => {
  const form = new multiparty.Form();
  form.parse(req, async(err, fields, files) => {
    if (err) throw err
    const audioDesc = fields.uploadAudioDesc[0]
    const audioName = fields.uploadAudioName[0]
      // //新音频文件
    const { name, src } = saveUploadAudio(audioName, audioDesc, files[fieldsConfig.file], fieldsConfig.file)
      // //新音频图片
    const { cover } = saveUploadAudio(audioName, audioDesc, files[fieldsConfig.img], fieldsConfig.img)

    await tMusic.update({
      name: name || "",
      src: src || "",
      cover: cover || "",
      desc: audioDesc
    })
    debug('写入数据库成功')
    res.data = {
      src: src || "",
      name: name || "",
      imageSrc: cover || ""
    }
    next()
  })
})

//保存上传的音乐文件
function saveUploadAudio(audioName, audioDesc, files, fileType) {
  let fileData = {};
  if (files && files.length >= 1) {
    files.forEach((data, index) => {
      const { originalFilename, path, size } = data
      let file = fs.readFileSync(path)
      switch (fileType) {
        case fieldsConfig['file']:
          if (size == 0) {
            fileData.name = ""
            fileData.src = ""
            return
          }
          let musicPath = `${staticPath}/music/${originalFilename}`
          fs.writeFileSync(musicPath, file, 'binary')
          debug(`保存${originalFilename}成功`)
          fileData.name = (audioName || originalFilename && originalFilename.replace(/(.*)\.mp3/, '$1')) || ""
          fileData.src = `${HOST}${PORT}/music/${originalFilename}`

          break;
        case fieldsConfig['img']:
          if (size == 0) {
            fileData.imageSrc = ""
            return
          }
          let coverPath = `${staticPath}/music/${Date.now()}.${originalFilename.replace(/.*\.(jpg|jpeg|png)$/, '$1')}`
          fs.writeFileSync(coverPath, file, 'binary')
          debug(`保存${originalFilename}成功`)
          fileData.cover = `${HOST}${PORT}/music/${originalFilename}`
          break;
        default:
          debug('[error]:上传的音乐类型未知!')
          throw new Error('[error]:上传的音乐类型未知!')
      }
    })
  }
  return fileData
}


module.exports = router;