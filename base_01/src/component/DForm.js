import React, { Component } from 'react'
import { WifiOutlined } from '@ant-design/icons'

function DFormCreate(Comp) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.options = {} //字段选项设置
      this.state = {} //各字段值
    }
    handleChange = (e) => {
      //处理表单项的输入事件
      const { name, value } = e.target
      this.setState(
        {
          [name]: value,
        }, //处理校验事项
        () => {
          //setState异步,数值变化后再校验
          this.validateField(name)
        }
      )
    }
    handleFocus = (e) => {
      const field = e.target.name
      this.setState({
        [field + 'Focus']: true,
      })
    }
    //判断组件是否被用户点过
    isFieldTouched = (field) => !!this.state[field + 'Focus'] //转成布尔值
    getFieldError = (field) => this.state[field + 'message']
    validateField = (field) => {
      const rules = this.options[field].rules
      //有一个没有校验成功就不进行下去了
      const ret = rules.some((rule) => {
        if (rule.required) {
          //仅验证必填项
          if (!this.state[field]) {
            //校验失败
            this.setState({
              [field + 'message']: rule.message,
            })
            return true //若有校验失败,返回true
          }
        }
      })
      if (!ret) {
        //没失败,校验成功
        this.setState({
          [field + 'message']: '',
        })
      }
      return !ret
    }
    //校验所有字段
    validate = (cb) => {
      const rets = Object.keys(this.options).map((field) =>
        this.validateField(field)
      )
      //如果校验结果全部都是true,则校验成功
      const ret = rets.every((v) => v === true)
      cb(ret)
    }
    getFiledDec = (field, option, InputComp) => {
      this.options[field] = option
      return (
        <div>
          {React.cloneElement(InputComp, {
            //参数2为控件属性
            name: field, //控件name
            value: this.state[field] || '', //控件值
            onChange: this.handleChange, //change事件处理
            onFocus: this.handleFocus, //判断控件是否获得焦点
          })}
        </div>
      )
    }
    render() {
      return (
        <Comp
          {...this.props}
          getFiledDec={this.getFiledDec}
          value={this.state}
          validate={this.validate}
          isFieldTouched={this.isFieldTouched}
          getFieldError={this.getFieldError}
        ></Comp>
      )
    }
  }
}

class FormItem extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.children}
          {this.props.validateStatus === 'error' && <p>{this.props.help}</p>}
        </div>
      </div>
    )
  }
}

class Input extends Component {
  render() {
    return (
      <div>
        {/* 前缀图标 */}
        {this.props.prefix}
        {/* 老爹在 使用这些属性的时候应当指明这些属性*/}
        <input {...this.props} />
      </div>
    )
  }
}
@DFormCreate
class DFormSample extends Component {
  onSubmit = () => {
    this.props.validate((isValid) => {
      if (isValid) {
        alert('校验成功,提交登录')
        console.log(this.props.value)
      } else {
        alert('校验失败')
      }
    })
  }
  render() {
    const { getFiledDec, isFieldTouched, getFieldError } = this.props
    const userNameError = isFieldTouched('uname') && getFieldError('uname')
    const passwordError = isFieldTouched('pwd') && getFieldError('pwd')
    return (
      <div>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFiledDec(
            'uname',
            {
              rules: [{ required: true, message: '请填写用户名' }],
            },
            <Input type="text" prefix={<WifiOutlined />} />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFiledDec(
            'pwd',
            {
              rules: [{ required: true, message: '请填写密码' }],
            },
            <Input type="password" prefix={<WifiOutlined />} />
          )}
        </FormItem>
        <button onClick={this.onSubmit}>登录</button>
      </div>
    )
  }
}
export default DFormSample
