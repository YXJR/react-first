// dva完整版使用
import React from "react"
import dva, { connect } from "dva"
const app = dva()

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
app.router(() => (
  <div>
    <ConnectedCounter />
    <ConnectedCounter1 />
  </div>
))
app.start("#root")
