import React from "react"
import { message, Space } from "antd"
import "./index.scss"
import { useParams } from "react-router-dom"
import axios from "axios"
import Comment from "./comment.js"
function ArticleDetail() {
  const { id } = useParams()
  const [detail, setDetail] = React.useState({})
  /**
   * 问题:这里如果不给useEffect设置依赖值为空，React.useEffect里的代码块执行时就会形成loop
   */
  React.useEffect(() => {
    axios
      .get(`http://localhost:7001/articles/${id}`)
      .then((res) => {
        setDetail(() => {
          return res.data
        })
      })
      .catch((e) => {
        // message.error(e.message)
        message.error(`获取失败`)
      })
  }, [])
  return (
    <div className="detail">
      <div className="detail-title">{detail.title}</div>
      <div className="detail-time">
        <Space>
          <span className="detail-time-create">
            创建时间:{detail.created_at}
          </span>
          <span className="detail-time-update">
            更新时间:{detail.update_at}
          </span>
        </Space>
      </div>
      <div className="detail-subtitle">{detail.subtitle}</div>
      <Comment id={id} />
    </div>
  )
}

export default ArticleDetail
