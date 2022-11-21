// 路由管理的特点:
// 1.路由也是组件
//2.分布式配置
//3.包含式匹配

import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import { login } from '../store/user.redux'
import store from '../store/index'

function App(props) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/foo">foo</Link>
        </li>
      </ul>
      {/* 路由的配置 */}
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/about" component={About} /> */}
        <PrivateRoute path="/about" component={About} />
        <Route path="/detail/:course" component={Detail} />
        <Route path="/login" component={Login} />
        {/* 404页面,没有path 一定会匹配到 */}
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}
function NoMatch(params) {
  return <div>404页面</div>
}
function Home({ location }) {
  console.log('获取的参数是', location.state)

  return (
    <div>
      <ul>
        <li>
          <Link to="/detail/web">Web</Link>
        </li>
        <li>
          <Link to="/detail/python">python</Link>
        </li>
        <li>
          <Link to="/detail/java">java</Link>
        </li>
      </ul>
    </div>
  )
}
function About() {
  return (
    <div>
      {/* 显示用户信息和订单 */}
      <h2>用户中心</h2>
      <div>
        <Link to="/about/me">个人信息</Link>
        <Link to="/about/order">订单信息</Link>
      </div>
      <Switch>
        <Route path="/about/me" component={() => <div>我的信息</div>}></Route>
        <Route
          path="/about/order"
          component={() => <div>订单信息</div>}
        ></Route>
        {/* 重定向 */}
        <Redirect to="/about/me"></Redirect>
      </Switch>
    </div>
  )
}
//接口
// const auth = {
//   isLogin: false,
//   login(cb) {
//     this.isLogin = true
//     setTimeout(cb, 300)
//   },
// }
//登录组件
@connect((state) => ({ isLogin: state.user.isLogin }), { login })
class Login extends Component {
  // state = { isLogin: false }
  // login = () => {
  //   auth.login(() => {
  //     this.setState({ isLogin: true })
  //   })
  // }
  render() {
    // 拿到回跳的地址
    const from = this.props.location.state.from || '/'
    if (this.props.isLogin) {
      return <Redirect to={from} />
    }
    return (
      <div>
        <p>请先登录</p>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}
@connect((state) => ({ isLogin: state.user.isLogin }))
//路由守卫:定义可以验证的高阶组件
class PrivateRoute extends Component {
  render() {
    const { isLogin, component: Component, ...rest } = this.props
    // redner和component选项二选一
    return (
      <Route
        {...rest}
        render={(props) =>
          isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location.pathname },
              }}
            />
          )
        }
      />
    )
  }
}

//传参
function Detail({ match, history, location }) {
  //match 参数获取路由等信息
  //history -导航
  //location -url定位
  console.log(match, history, location)
  return (
    <div>
      {/* 获取参数 -路径参数*/}
      {match.params.course}
      {/* 命令式导航 */}
      <button onClick={history.goBack}>后退</button>
      {/* <button onClick={() => history.push('/')}>回到首页</button> */}
      <button
        onClick={() => history.push({ pathname: '/', state: { foo: 'bar' } })}
      >
        回到首页
      </button>
    </div>
  )
}
export default class RouterSimple extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <App></App>
        </Provider>
      </BrowserRouter>
    )
  }
}
