// redux角色 redux 提供createStore这个函数，用来生成 Store。
import { createStore, applyMiddleware, combineReducers } from 'redux'
import counter from '../store/Counter.redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import user from '../store/user.redux'
//reducer:状态修改具体执行者

//saga的注入
import createSagaMiddleware from 'redux-saga'
import saga from './saga'

//1.创建中间件
const mid = createSagaMiddleware();
//2.应用中间件
const store =  createStore(
  combineReducers({ counter, user }),
  applyMiddleware(logger, mid)
)
//3.执行run方法
mid.run(saga)

//4.导出
export default store



export default
