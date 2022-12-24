import React from "react"
import { Input, Button } from "antd"
import axios from "axios"
import { useParams } from "react-router-dom"
import "./index.scss"

export default function ArticleEdit(props) {
  const [article, setArticle] = React.useState({})
  const { id } = useParams()

  React.useEffect(() => {
    getArticleDetail()
  }, [])

  const getArticleDetail = () => {
    axios.get(`http://localhost:7001/articles/${id}`).then((res) => {
      console.log(res.data)
      setArticle(() => {
        return res.data
      })
    })
  }

  const editArticle = () => {
    axios({
      baseURL: "http://localhost:7001",
      method: "patch",
      url: `/articles/${id}/edit`,
      data: {
        content: article.content,
      },
    }).then()
  }

  return (
    <div className="main">
      <div className="magin-bottom-8 ">
        <div className="title">{article.title}</div>
        <div className="subtitle">
          <span> {article.created_at}</span>
          <span> {article.update_at}</span>
        </div>
      </div>
      <Input.TextArea
        value={article.content}
        placeholder="请输入文章内容"
        autoSize={{
          minRows: 6,
          maxRows: 12,
        }}
      />
      <Button type="primary" className="margin-top-20" onClick={editArticle}>
        修改
      </Button>
    </div>
  )
}
