const mode = process.env.NODE_ENV || "DEV"

//前后端 开发环境 生产环境  host port 配置

const options = {
  host: mode == "DEV" ? "http://192.168.2.177" : "http://220.184.253.220:9001", //"mymengqiqi.com", //http://lijinke.xicp.io
  dev_port: 666,
  socket_host: "http://192.168.2.177",
  socket_port: 1997,
  PORT: 555,
  origin: "ignacioWeb",
  staticPath: __dirname + '/../public',
  db_path: 'mongodb://localhost/ignacioWeb',
  emailService: "qq", //邮件服务商
  adminEmail: "119414860@qq.com", //发邮件的人邮箱
  AUTHCODE: "csvbtlmbyqbabhbi", //授权码
  staticPath: __dirname + '/../public',
  currentMonth: new Date().getMonth() + 1,
  companyName: "龙鸿轩home", //公司名字
  toolInfo: "小工具v0.1", //工具名字
  currentTime: function() {
    const date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds(),
      hh = h < 10 ? "0" + h : h,
      mm = m < 10 ? "0" + m : m,
      ss = s < 10 ? "0" + s : s

    return year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss //当前时间
  }
}
options.port = mode === "DEV" ? ":" + options.PORT : ""
options.defaultEmailTitle = options.companyName + " {name} " + options.currentMonth + "月表"

module.exports = options