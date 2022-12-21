import React from "react"
import axios from "axios"
import { List, Input, Button, message } from "antd"

export default function Comment(props) {
  const { id } = props
  const [comment, setComment] = React.useState("")
  const [comments, setComments] = React.useState([])
  const [initLoading, setInitLoading] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    setInitLoading(true)
    getCommentLists()
  }, [])
  function submit() {
    if (!comment) {
      message.warning("评论不能为空")
      return
    }
    getCommentLists()
  }
  function getCommentLists() {
    axios({
      method: "post",
      baseURL: "http://localhost:7001",
      url: `/articles/${id}/comment`,
      data: { comment: comment },
    })
      .then((res) => {
        setInitLoading(false)
        setLoading(false)
        let dataList = comments.length
          ? comments.concat(res.data.data.comments)
          : res.data.data.comments
        setComments(dataList)
      })
      .catch((e) => {})
  }
  function onLoadMore() {
    setLoading(true)
    getCommentLists()
  }
  const loadMore =
    !initLoading && !loading ? (
      <div>
        <Button onClick={onLoadMore}>加载更多</Button>
      </div>
    ) : null
  return (
    <div className="comment">
      <Input.TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="开始写评论..."
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <Button type="primary" className="comment-submits" onClick={submit}>
        提交
      </Button>
      <List loadMore={loadMore}>
        {comments.length
          ? comments.map((comment) => {
              return comment ? (
                <List.Item key={comment}>{comment}</List.Item>
              ) : null
            })
          : null}
      </List>
    </div>
  )
}
