/**
 * 代办事项表单，包括输入框和添加表单功能
 */

import React from "react"
import { Input, Button, Space } from "antd"
import "./todoList.scss"

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
    this.inputValue = ""
  }
  inputValueChange = (event) => {
    this.inputValue = event.target.value
  }
  addTodoItem = () => {
    this.setState({ loading: true })
    this.props.addTodoItem(this.inputValue)
  }
  render() {
    return (
      <div className="disFlex">
        <Space size="large" className="main disFlex">
          <Input
            placeholder="Basic usage"
            allowClear
            onChange={this.inputValueChange}
            size="middle"
          />
          <Button
            type="primary"
            loading={this.state.loading}
            onClick={this.addTodoItem}
          >
            添加
          </Button>
        </Space>
      </div>
    )
  }
}

/**
 * 问题1：在ant-design组件Input上绑定ref（ React.createRef() ），是拿不到input的value值得
 * 问题2：button的loading效果，如何在父组件接口数据加载完毕之后关闭
 *    解决：在父组件上绑定ref，通过ref拿到子组件实例，然后操作子组件的状态
 */
