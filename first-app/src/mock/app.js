var express = require("express")
var app = express()

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "content-type")
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
  if (req.method.toLowerCase() == "options") {
    res.send(200)
  } else {
    next()
  }
})

var todoItems = [
  { id: 0, value: "React", done: false, delete: false },
  { id: 1, value: "Vue", done: false, delete: false },
]

app.get("/items", function (req, res) {
  res.send({
    code: 1,
    message: "成功获取TodoList数据",
    data: todoItems,
  })
})

/**
 *问题：这里需要增加body-parser的包，否则在请求该接口的时候会500
 */

app.post("/items", function (req, res) {
  if (req.body.todoItem) {
    todoItems = [...todoItems, req.body.todoItem]
  }
  res.send({
    code: 1,
    message: "修改成功",
    data: todoItems,
  })
})

app.delete("/items", function (req, res) {
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

app.listen("7001", function () {
  console.log("app启动了")
})
