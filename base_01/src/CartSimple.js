import React, { Component } from 'react'

export default class cartSimple extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goods: [
        { id: 1, name: 'diandian', sex: 'boy' },
        { id: 2, name: 'youyou', sex: 'girl' },
        { id: 3, name: 'yeye', sex: 'boy' },
      ],
      text: '',
    }
  }
  addGoods = () => {
    this.setState((preState) => ({
      goods: [
        ...preState.goods,
        { id: '4', name: preState.text, sex: 'weizhi' },
      ],
    }))
  }

  textChange = (e) => {
    this.setState({
      text: e.target.value,
    })
  }
  render() {
    //根据父组件有没有传递标题来看是否显示
    const title = this.props.title ? <h1>{this.props.title}</h1> : null
    //将js对象数组转换成jsx数组
    const goods = this.state.goods.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))
    return (
      <div>
        {/* 条件语句 */}
        {title}
        {/* 添加商品 */}
        <div>
          <input
            type="text"
            value={this.state.text}
            onChange={(e) => this.textChange(e)}
          />
          <button onClick={this.addGoods}>添加商品</button>
        </div>
        {/*  列表渲染 */}
        <ul>{goods}</ul>
      </div>
    )
    // 循环语句
  }
}
