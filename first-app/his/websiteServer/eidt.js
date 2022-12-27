import React from "react"
import { Input, Button, message } from "antd"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

import "./index.scss"

export default function ArticleEdit(props) {
  const [article, setArticle] = React.useState({})
  const [content, setContent] = React.useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    getArticleDetail()
  }, [])

  const getArticleDetail = () => {
    axios.get(`http://localhost:7001/articles/${id}`).then((res) => {
      setArticle(() => {
        return res.data
      })
      setContent(() => {
        return res.data.content
      })
    })
  }

  const editArticle = () => {
    axios({
      method: "patch",
      url: `http://localhost:7001/articles/${id}`,
      data: {
        content: content,
      },
    }).then((res) => {
      message.success({
        content: "编辑成功",
        duration: 2,
        onClose: () => {
          navigate("/")
        },
      })
      getArticleDetail()
    })
  }

  return (
    <div className="main">
      <div className="magin-bottom-8 ">
        <div className="title">{article.title}</div>
        <div className="subtitle">
          <span className="margin-right-16">
            创建时间: {article.created_at}
          </span>
          <span>更新时间: {article.update_at}</span>
        </div>
      </div>
      <Input.TextArea
        /**
         *问题：这里不能直接绑定article.content，如果直接绑定，allowClear则不能点击图标清除文本内容
          解决：借助content字段转化
         */
        value={content}
        allowClear
        /**
         * 问题：删除onChange方法，文本不能进行输入
         */
        onChange={(e) => {
          let content = e.target.value
          setContent(() => {
            return content
          })
        }}
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
