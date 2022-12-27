import React from "react"
import { Button, Form, Input, message } from "antd"
import axios from "axios"
export default function ArticlesAdd() {
  const onFinish = (value) => {
    //验证通过的逻辑
    axios({
      method: "post",
      url: "http://localhost:7001/articles",
      data: { ...value },
    })
      .then((res) => {
        message.success(res.data.message)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const onFinishFailed = (errMessage) => {
    //验证没有通过的逻辑
    console.log(errMessage)
  }
  return (
    <Form
      style={{ width: "800px", margin: "0 auto", paddingTop: "60px" }}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      autoComplete="off"
      //   initialValues={article}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[
          {
            required: true,
            message: "请输入标题",
          },
        ]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item
        label="副标题"
        name="subtitle"
        rules={[
          {
            required: true,
            message: "请输入副标题",
          },
        ]}
      >
        <Input placeholder="请输入副标题" />
      </Form.Item>
      <Form.Item
        label="内容"
        name="content"
        rules={[
          {
            required: true,
            message: "请输入内容",
          },
        ]}
      >
        <Input.TextArea
          placeholder="请输入内容"
          autoSize={{
            minRows: 5,
            maxRows: 8,
          }}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}
