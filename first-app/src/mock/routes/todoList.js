var express = require("express")
var router = express.Router()

var todoItems = require("../data/todoList")

router.get("/items", function (req, res) {
  res.send({
    code: 1,
    message: "成功获取TodoList数据",
    data: todoItems,
  })
})

/**
 *问题：这里需要在app.js中增加body-parser的包，否则在请求该接口的时候会500,主要是对post和delete方法请求主体的解析
 */

router.post("/items", function (req, res) {
  if (req.body.todoItem) {
    todoItems = [...todoItems, req.body.todoItem]
  }
  res.send({
    code: 1,
    message: "修改成功",
    data: todoItems,
  })
})

router.delete("/items", function (req, res) {
  if (req.body.id) {
    todoItems.forEach((todoItem) => {
      if (todoItem.id === req.body.id) {
        todoItem.delete = true
      }
    })
  }
  console.log(req.body)
  res.send({
    code: 1,
    message: "删除成功",
    data: todoItems,
  })
})

module.exports = router
