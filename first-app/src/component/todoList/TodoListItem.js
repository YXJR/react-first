/**
 * 代办事项列表中的具体内容及相关操作，如删除
 */
import React from "react"
import { Button, Space, List } from "antd"
import "./todoList.scss"
export default class ListItem extends React.Component {
  deleteTodoItem = () => {
    this.props.deleteTodoItem(this.props.item)
  }
  render() {
    return (
      <List.Item>
        <Space>
          <div className="w600 textLeft">{this.props.item.value}</div>
          <Button type="default" size="middle" onClick={this.deleteTodoItem}>
            删除
          </Button>
        </Space>
      </List.Item>
    )
  }
}
