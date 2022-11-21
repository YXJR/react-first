export function createStore(reducer, enhancer) {
  //enhancer传入的就是applyMiddleware中间件
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  let currentState = {}
  let currentListeners = []

  function getState() {
    return currentState //闭包
  }
  function subscribe(listener) {
    currentListeners.push(listener) //listener是一些函数
  }

  function dispatch(action) {
    currentState = reducer(currentState, action) //通过reducer获取更改后的state
    currentListeners.forEach((v) => v())
    return action //一般是一个对象
  }
  dispatch({ type: '@IMOOC/WONIU-REDUX' }) //什么都不是,就是为了触发reducer里面的default.初始化状态的执行
  return { getState, subscribe, dispatch } //导出的store是个对象,有3个方法,就是这三个
}

export function applyMiddleware(...middlewares) {
  //enhancer,按照顺序展开增强器,返回一个函数
  return (createStore) => (...args) => {
    //createStore函数执行之后再接收一些参数做些事
    const store = createStore(...args)
    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    }

    const middlewareChain = middlewares.map((middleware) => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch)
    return {
      ...store,
      dispatch,
    }
  }
}
export function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch)
    return ret
  }, {})
}

import React from 'react'
import PropTypes from 'prop-types'

export const connect = (
  mapStateToProps = (state) => state,
  mapDispatchToProps = {}
) => (WrapComponent) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object,
    }
    constructor(props, context) {
      //context上下文传递下来的参数,希望拿到祖级传递下来的store
      super(props, context)
      this.state = {
        props: {},
      }
    }
    componentDidMount() {
      const { store } = this.context
      store.subscribe(() => this.update())
      this.update()
    }
    update() {
      const { store } = this.context
      const stateProps = mapStateToProps(store.getState())
      const dispatchProps = bindActionCreators(
        mapDispatchToProps,
        store.dispatch
      )
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps,
        },
      })
    }
    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}

export class Provider extends React.Component {
  static childContextType = {
    store: PropTypes.object,
  }
  getChildContext() {
    return { store: this.store }
  }
  constructor(props, context) {
    super(props, context)
    this.state = props.store
  }
  render() {
    return this.props.children
  }
}

const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action == 'function') {
    return action(dispatch, getState)
  }
  return next(action)
}
export default thunk
