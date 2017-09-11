import MusicPlayerAction from "Home/reducer" 
import RootAction from "app/components/Root/reducer" 
import UploadAudioAction from "shared/components/MusicPlayer/reducer"
import TalkAction from "app/routes/talk/reducer"
import ArticleAction from "app/routes/article/reducer"
import ArticleDetailAction from "app/routes/articleDetail/reducer"
import AdminAction from "app/routes/admin/reducer"

import { combineReducers } from "redux"     //reducer的合并
//TODO  组件过多之后 reducer过多 应该每一个组件一个reducer  然后全部导入到这个文件中实现reducer的拆分

const chatReducer = combineReducers({
  MusicPlayerAction,
  UploadAudioAction,
  TalkAction,
  ArticleAction,
  ArticleDetailAction,
  AdminAction,
  RootAction
})

export default chatReducer
