import React from "react"
import { message, Space } from "antd"
import { FormOutlined } from "@ant-design/icons"
import "./index.scss"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Comment from "./comment.js"

function ArticleDetail(props) {
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
  const toEdit = () => {}
  return (
    <div className="detail">
      <div className="detail-title">
        <span className="margin-right-8"> {detail.title}</span>
        <Link to={{ pathname: `/articles/${id}/edit` }}>
          <FormOutlined onClick={toEdit} />
        </Link>
      </div>
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
