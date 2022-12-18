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
    this.TodoFormRef = React.createRef()
    this.state = {
      lists: [],
      listLoading: false,
    }
  }

  componentWillMount() {
    //此生命周期中是拿不到ref的值的

    const that = this
    that.setState({ listLoading: true })
    axios.get("http://localhost:7001/items").then((res) => {
      that.setState({ lists: [...res.data.data] })
      that.setState({ listLoading: false })
    })
  }
  addTodoItem = (item) => {
    const FormThis = this.TodoFormRef.current
    const newTodoItem = {
      id: this.state.lists ? this.state.lists.length : 0,
      value: item,
      done: false,
      delete: false,
    }
    const that = this
    that.setState({ listLoading: true })
    axios
      .post("http://localhost:7001/items", {
        todoItem: newTodoItem,
      })
      .then((res) => {
        // 问题：在这个时候消除添加按钮的loading,采用什么方式通知
        that.setState({ lists: [...res.data.data] })
        FormThis.setState({ loading: false })
        that.setState({ listLoading: false })
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
        <TodoForm
          className="margin-top-40 margin-bottom-16"
          addTodoItem={this.addTodoItem}
          ref={this.TodoFormRef}
        />
        <TodoList
          loading={this.state.listLoading}
          todoItems={this.state.lists}
          deleteTodoItem={this.deleteTodoItem}
        ></TodoList>
      </div>
    )
  }
}
