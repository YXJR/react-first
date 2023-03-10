// dva完整版使用
import React from "react"
import dva, { connect } from "dva"t
import { Router, Link, Route, rouerRedux } from "dva/router"

const app = dva()
let { ConnectedRouter, push } = routerRedux
//定义一个模型
//let reducer = combineReducers({ counter })
app.model({
  namespace: "counter", // 命名空间
  state: { number: 0 }, //每个命名空间都有自己的状态
  reducers: {
    //每个命名空间都有自己的reducer处理器
    add(state) {
      return { number: state.number + 1 }
    },
  },
  effects: {
    *asyncAdd(action, { call, put }) {
      //动作 sagaEffects
      console.log("action", action)
      yield call(delay, 1000)
      //如果在effect里派发动作，如果是派发给自己的模型的话，不需要加namespace
      yield put({ type: "add" })
    },
    *goto({ payload }, { put }) {
      yield put(push(payload))
    },
  },
})
app.model({
  namespace: "counter1", // 命名空间
  state: { number: 0 }, //每个命名空间都有自己的状态
  reducers: {
    //每个命名空间都有自己的reducer处理器
    add(state) {
      return { number: state.number + 1 }
    },
  },
})

//定义组件
function Counter(props) {
  return (
    <div>
      <p>{props.number}</p>
      <button onClick={() => props.dispatch({ type: "counter/add" })}>+</button>
    </div>
  )
}
function Counter1(props) {
  return (
    <div>
      <p>{props.number}</p>
      <button onClick={() => props.dispatch({ type: "counter1/add" })}>
        +
      </button>
    </div>
  )
}

//连接组件和仓库
let mapStateToProps = (state) => state.counter
const ConnectedCounter = connect(mapStateToProps)(Counter)
const ConnectedCounter1 = connect((state) => state.counter1)(Counter1)

//定义路由规则
app.router((api) => (
  <ConnectedRouter history={api.history}>
    <ul>
      <li>
        <Link to="counter1">Counter1</Link>
      </li>
      <li>
        <Link to="counter2">Counter2</Link>
      </li>
      <Route path="/counter" component={ConnectedCounter} exact={true}></Route>
      <Route
        path="/counter1"
        component={ConnectedCounter1}
        exact={true}
      ></Route>
    </ul>
  </ConnectedRouter>
))
app.start("#root")

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {}, 1000)
  })
}
