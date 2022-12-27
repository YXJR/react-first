/**
 * 代办事项列表
 */
import React from "react"
import TodoListItem from "./TodoListItem"
import { List } from "antd"
import "./todoList.scss"
export default class TodoList extends React.Component {
  deleteTodoItem = (item) => {
    this.props.deleteTodoItem(item)
  }
  render() {
    return (
      <List loading={this.props.loading}>
        {this.props.todoItems.map((item) => {
          if (item.delete) return
          return (
            <TodoListItem
              key={item.id}
              item={item}
              deleteTodoItem={this.deleteTodoItem}
            />
          )
        })}
      </List>
    )
  }
}
