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
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
    }
  }

  componentWillMount() {
    const that = this
    axios.get("http://localhost:7001/items").then((res) => {
      that.setState({ lists: [...res.data.data] })
    })
  }

  addTodoItem = (item) => {
    const newTodoItem = {
      id: this.state.lists ? this.state.lists.length : 0,
      value: item,
      done: false,
      delete: false,
    }
    const that = this
    axios
      .post("http://localhost:7001/items", {
        todoItem: newTodoItem,
      })
      .then((res) => {
        that.setState({ lists: [...res.data.data] })
      })
  }
  deleteTodoItem = (item) => {
    const that = this
    axios({
      method: "delete",
      baseURL: "http://localhost:7001",
      url: "/items",
      data: {
        id: item.id,
      },
    }).then((res) => {
      that.setState({ lists: [...res.data.data] })
    })
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
