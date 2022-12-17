/**
 * 整个TodoList表单,集成了todoForm和todoList;
 * 整个的todoList;包括增删的操作
 */
import React from "react"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"
import axios from "axios"
import "./todoList.scss"

export default class TodoLists extends React.Component {
  //lists = []
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
    }
  }

  componentWillMount() {
    const that = this
    axios.get("http://localhost:7001/items").then((res) => {
      console.log(res.data)
      that.setState({ lists: [...res.data] })
    })
  }

  addTodoItem = (item) => {
    const newTodoItem = {
      id: this.state.todoItems ? this.state.todoItems.length : 0,
      value: item,
      done: false,
      delete: false,
    }
    this.setState({ lists: [...this.state.lists, newTodoItem] })
  }
  deleteTodoItem = (item) => {
    item.delete = true
    this.setState({ lists: [...this.state.lists, item] })
  }
  render() {
    return (
      <div className="main">
        <h1>TodoList</h1>
        <TodoForm addTodoItem={this.addTodoItem} />
        <TodoList
          todoItems={this.state.lists}
          deleteTodoItem={this.deleteTodoItem}
        ></TodoList>
      </div>
    )
  }
}
