var express = require("express")
var app = express()
var todoList = require("./routes/todoList.js")
var articleRouter = require("./routes/articles")
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

app.use(todoList)
app.use(articleRouter)
app.listen("7001", function () {
  console.log("app启动了")
})
