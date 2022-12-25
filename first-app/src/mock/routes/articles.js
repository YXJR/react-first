var express = require("express")
var articleRouter = express.Router()
const moment = require("moment")
const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const adapter = new FileSync("articles.json")
const db = low(adapter)

db.defaults({
  articles: [
    {
      id: "1",
      title: "React开发",
      subtitle: "技术栈React + ant-design + express + axios + scss",
      created_at: "2022-12-19 21:20:00",
      update_at: "2022-12-19 21:20:00",
    },
  ],
}).write()

//查询列表和搜索 接口
articleRouter.get("/articles", function (req, res) {
  if (req.query.search_text) {
    const article = db
      .get("articles")
      .find({ title: req.query.search_text })
      .value()
    res.send({
      code: 1,
      message: "数据获取成功",
      data: article,
    })
  } else {
    res.send({
      code: 1,
      message: "数据获取成功",
      data: db.get("articles"),
    })
  }
})

//新增文章
articleRouter.post("/articles", function (req, res) {
  const article = {
    id: db.get("articles").size().value() + 1,
    created_at: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    update_at: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    ...req.body,
  }
  db.get("articles").push(article).write()
  res.send({
    code: 1,
    message: "数据获取成功",
    data: article,
  })
})

//获取文章详情
articleRouter.get("/articles/:id", function (req, res) {
  const article = db
    .get("articles")
    .find({
      id: req.params.id,
    })
    .value()

  res.send(article)
})

//文章评论
articleRouter.post("/articles/:id/comment", function (req, res) {
  let id = req.params.id
  const comment = req.body.comment
  const article = db.get("articles").find({ id: id })
  const comments = article.value()["comments"]
    ? article.value()["comments"]
    : []
  if (comment) {
    comments.push(comment)
    article.assign({ comments }).write()
  }

  res.send({
    code: 1,
    message: "数据获取成功",
    data: article,
  })
})
//文章编辑接口
articleRouter.patch("/articles/:id", function (req, res) {
  let id = req.params.id
  let content = req.body.content

  const article = db.get("articles").find({ id: id })
  article
    .assign({
      content: content,
      update_at: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    })
    .write()
  res.send({
    code: 1,
    message: "编辑成功",
    data: article,
  })
})

module.exports = articleRouter
