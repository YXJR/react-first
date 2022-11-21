import React, { Component } from 'react'

//高阶组件
// const WithName = (Com) => {
//   return (props) => <Com {...props} name="高阶组件的试用"></Com>
// }

//甚至可以重写生命周期
const WithName = (Com) => {
  class newComponent extends Component {
    componentDidMount() {
      console.log('do something')
    }
    render() {
      return <Com {...this.props} name="高阶组件的试用"></Com>
    }
  }
  return newComponent
}

const WithLog = (Com) => {
  console.log(Com.name + '渲染了')
  return (props) => <Com {...props} />
}
//放在上面的先执行

@WithName
@WithLog

//export default WithLog(WithName(Kaikeba)) 这种写法太累赘,所以引入高阶组件的装饰器写法
class Kaikeba extends Component {
  render() {
    return (
      <div>
        {this.props.stage}--{this.props.name}
      </div>
    )
  }
}
export default Kaikeba
