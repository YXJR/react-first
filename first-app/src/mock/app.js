var express = require("express")
var createError = require("http-errors")
var session = require("express-session")
var app = express()
var todoList = require("./routes/todoList.js")
var articleRouter = require("./routes/articles")

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "content-type")
  res.header(
    "Access-Control-Allow-Methods",
    "DELETE,PUT,POST,GET,OPTIONS,PATCH"
  )
  if (req.method.toLowerCase() == "options") {
    res.send({
      code: 200,
      message: "OPTION",
    })
  } else {
    next()
  }
})

app.use(
  session({
    secret: "session_secret",
    saveUninitialized: true, //保存未初始化的session
    resave: true, //保存seesion至存储
    cookie: {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //过期时间为一天
    },
  })
)
app.use(todoList)
app.use(articleRouter)
app.listen("7001", function () {
  console.log("app启动了")
})
