/**
 * 代办事项列表中的具体内容及相关操作，如删除
 */
import React from "react"
import { Button, Space } from "antd"
import "./todoList.scss"
const style = {
  width: "500px",
  border: "1px solid red",
  margin: "0 auto",
  listStyle: "none",
}
export default class ListItem extends React.Component {
  deleteTodoItem = () => {
    this.props.deleteTodoItem(this.props.item)
  }
  render() {
    return (
      <li className="margin-bottom-10" style={style}>
        <Space>
          <label>{this.props.item.value}</label>
          <Button type="default" size="small" onClick={this.deleteTodoItem}>
            删除
          </Button>
        </Space>
      </li>
    )
  }
}
