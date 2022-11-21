import React, { Component } from "react"
import logo from "./psb.jpg"
import "./App.css"
import { Button } from "antd"
//import 'antd/dist/antd.css'
//函数型组件传递props.父组件传递的.组件就函数型还有class声明的.
//如果一个组件有状态,需要更改状态,就是要将其声明成class类型的.若只关心展示,不关心逻辑,就使用函数型组件
function Welcome1(props) {
  return <div>hello,{props.name}</div>
}

export default class App extends Component {
  //1.当需要状态时,需要构造函数
  constructor(props) {
    super(props)
    //2.初始化状态
    this.state = {
      date: new Date(),
      count: 1,
    }
  }
  formatName(user) {
    return user.firstName + " " + user.lastName
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      //3.更新状..一旦更新状态就会使得render进行重新渲染
      this.setState({ date: new Date() })
    }, 1000)
    //状态注意事项:
    //1.不能直接更改状态 this.state.date = new Date() 这是错误的
    //2.setState是异步的.会批量执行,所有的setState会同时执行完再返回结果进行操作.
    //当你的新改的值依赖前面的值时,需要使用函数的写法
    this.setState(
      (preState, preProps) => {
        return { count: preState.count + 1 }
      },
      () => {
        console.log(this.state.count)
      }
    )
  }
  componentWillUnmount() {
    //清理工作
    //在组件销毁时需要注销定时器.良好的编程习惯
    clearInterval(this.timer)
  }
  render() {
    const name = "Luxian"
    const jsx = <p>I love diandian so much!</p>
    return (
      <div>
        {/* antd组件试用 */}
        <Button type="primary">Button</Button>
        App组件
        {/* 表达式 */}
        <h1>{name}</h1>
        <h1>{this.formatName({ firstName: "diandian", lastName: "zhang" })}</h1>
        {/* render和formatName为同级,使用this访问 */}
        {/* 属性 */}
        <img src={logo} style={{ width: "100px" }} className="img" alt="" />
        {/* jsx本身也是表达式 */}
        {jsx}
        {/* 组件传值 ,出入的属性是只读的,是单项数据流.react没有双项数据绑定*/}
        <Welcome1 name="lucien"></Welcome1>
        {/* 使用状态 */}
        <p>{this.state.date.toLocaleTimeString()}</p>
      </div>
    )
  }
}
