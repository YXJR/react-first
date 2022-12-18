import React from "react"
import { Button, Input, Avatar, List, Space } from "antd"
import { MonitorOutlined } from "@ant-design/icons"

class Articles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
    }
  }
  render() {
    return (
      <div>
        <Space>
          <Input placeholder="Basic usage" />
          <Button type="primary">
            <MonitorOutlined />
            搜索按钮
          </Button>
        </Space>
        <List>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{"anti-design"}</a>}
              description="anti-design介绍"
            ></List.Item.Meta>
          </List.Item>
        </List>
      </div>
    )
  }
}
export default Articles
