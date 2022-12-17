var express = require("express")
var app = express()

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

var todoItem = [
  { id: 0, value: "React", done: false, delete: false },
  { id: 1, value: "Vue", done: false, delete: false },
]
app.get("/items", function (req, res) {
  res.send(todoItem)
})

app.listen("7001", function () {
  console.log("app启动了")
})
