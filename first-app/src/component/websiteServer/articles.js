import React from "react"
import { Avatar, List, Space, Input } from "antd"
import "./index.scss"
import axios from "axios"
class Articles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [
        {
          title: "ant-design",
          subtitle: "简介",
        },
      ],
      searchText: "",
    }
  }
  getArticles = () => {
    //axios.get("http://localhost:7001/articles")
  }
  inputSearch = (inputValue) => {
    //TODO: 调用搜索接口
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
        </Space>
        <List bordered style={{ marginTop: "20px" }} size="small">
          {this.state.articles.length
            ? this.state.articles.map((article) => {
                return (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                      }
                      title={<a href="https://ant.design">{article.title}</a>}
                      description={article.subtitle}
                    ></List.Item.Meta>
                  </List.Item>
                )
              })
            : null}
        </List>
      </div>
    )
  }
}
export default Articles
