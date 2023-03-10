import React from "react"
import { Link } from "react-router-dom"
import { Avatar, List, Space, Input, Button } from "antd"
import "./index.scss"
import axios from "axios"

class Articles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      searchText: "",
    }
  }

  componentWillMount() {
    this.getArticles()
  }

  getArticles = () => {
    axios.get("http://localhost:7001/articles").then((res) => {
      this.setState({ articles: res.data.data })
    })
  }
  inputSearch = (inputValue) => {
    axios
      .get(`http://localhost:7001/articles?search_text=${inputValue}`)
      .then((res) => {
        if (res.data.data) {
          this.setState({ articles: res.data.data })
        } else {
          this.setState({ articles: [] })
        }
      })
  }
  render() {
    return (
      <div className="main">
        <Space>
          <Input.Search
            placeholder="搜索标题或者内容"
            allowClear
            onSearch={this.inputSearch}
          />
          <Link to={{ pathname: "/articles/add" }}>
            <Button type="primary">新增</Button>
          </Link>
        </Space>
        <List bordered style={{ marginTop: "20px" }} size="small">
          {this.state.articles.length
            ? this.state.articles.map((article) => {
                return (
                  <Link
                    to={{ pathname: `/articles/${article.id}` }}
                    key={article.id}
                  >
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
                        title={article.title}
                        description={article.subtitle}
                      ></List.Item.Meta>
                    </List.Item>
                  </Link>
                )
              })
            : null}
        </List>
      </div>
    )
  }
}
export default Articles
