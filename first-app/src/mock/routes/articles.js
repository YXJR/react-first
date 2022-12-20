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

articleRouter.get("/articles", function (req, res) {
  if (req.query.search_text) {
    console.log(req.query.search_text)
    const articles = db
      .get("articles")
      .find({ content: req.query.search_text })
      .value()
    res.send(articles)
  } else {
    res.send({
      code: 1,
      message: "数据获取成功",
      data: db.get("articles"),
    })
  }
})

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

module.exports = articleRouter
