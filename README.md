# ignacioWeb

#### 龙鸿轩的个人网站
##### 手机访问

![ignacioWeb](http://www.mymengqiqi.com/myblog/music/app.png)
 
##### PC访问
http://blog.mymengqiqi.com:9000
##### 访问不了就是没启动 node:(
#### 使用技术栈:
- `React v15.X`
- `ES6,ES7`
- `webpack v3.0.0`
- `Redux`
- `React-Redux`
- `React-Router v3.x`
- `node.js`
- `yarn`
- `mongodb`
- `mongoose`
- `mocha`
- `chai`
- `less`
- `socket.io`

#### node环境
- `v8.1.0`

##### :)

- 安装依赖 `yarn`
- 跑起来 `yarn start`
- 打包 `yarn run build`
- 开发server `yarn run dev-server`
- 生产server `yarn run prod-server`

本地运行步骤

1.克隆项目 git clone https://github.com/ignaciozhuzhu/myblog.git
2.安装依赖 yarn 需要装一个 全局的 nodemon 和 pm2
3.更改 config/index.js 的 socket_port 为你的 本地ip
4.切换到目录 cd lijinkeWeb 连接数据库 yarn run connect-db 然后 拷贝数据库 yarn run restore
5.运行前端 yarn start 等待打包 自动打开浏览器 localhost:666
6.运行后端 yarn run dev-server


###### 前端部分 
 - react架子
 - webpack纯手打 :(，目前升级到了`v3.0.0` 根据知乎饿了么的专栏完成了按需加载 `code split`
 - 自己封装了一些网站需要的组件,`Modal`,`Message`,`Loading`,没错就是初始化加载骚气的svg动画
 - react,redux 用起来很舒服
##### 后端部分
  - 一直认为用的不是nodejs 而是 `express` 框架,之前对底层了解的太少,像buffer,nodejs 原生net 模板之类的,都是工作后期才知道的,翻阅了朴灵大师的深入浅出nodejs ，实在惭愧，原来我真的是一个框架熟练工 express+一些fs模块的io操作 感觉写的并不是nodejs,
  - express 要开一个端口,dev-server 要开一个端口,之前考虑过dev-server-middle 但是不好用，后来还是采用双端口开发的模式, api请求用fetch去跨域请求,最后把常用的命令写在npm scripts 里面 ，真的挺方便的
  - 数据库采用的mongodb ，也是在上家公司学到的,感觉很适合前端,比mysql简单,没有主键之类的,配合mongoose 函数的操作,不错:)


