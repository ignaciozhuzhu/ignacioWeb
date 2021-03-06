/*
 * @Author: ignaciozhu 
 * @Date: 2017-05-16 16:19:29 
 * @Last Modified by:   ignaciozhu 
 * @Last Modified time: 2017-05-16 16:19:29 
 */
import React from "react"
import ReactDOM from "react-dom"
import { AppContainer as HotLoader } from "react-hot-loader" //react-hot-loader  热更新可以保存状态  
import { Provider } from "react-redux"

import App from "app"
import store from "store"
//import "./style.less"


const render = (Component) => {
  ReactDOM.render(
    <HotLoader>
            <Provider store={store}>
                <Component/>
            </Provider>
        </HotLoader>,
    document.getElementById('root')
  )
}
render(App)
  //webpack内置对象
if (module.hot) {
  module.hot.accept("app", () => {
    render(App)
  });
}