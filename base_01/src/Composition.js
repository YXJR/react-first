import React, { Component } from 'react'

//Dialog
function Dialog(props) {
  return (
    <div style={{ border: `2px solid ${props.color || 'red'}` }}>
      {props.children}
      <div className="footer">{props.footer}</div>
    </div>
  )
}
function WelcomeDialog() {
  const confirmBtn = (
    <button
      onClick={() => {
        alert('react 确实好')
      }}
    >
      确定
    </button>
  )
  return (
    <Dialog color="skyblue" footer={confirmBtn}>
      <h1>欢迎光临</h1>
      <p>感谢使用react!</p>
    </Dialog>
  )
}

const api = {
  getUser: () => ({ name: 'diandian', age: '1' }),
}
function Fecth(props) {
  let user = api[props.name]()
  return props.children(user)
}

function FilterP(props) {
  return (
    <div>
      {React.Children.map(props.children, (child) => {
        console.log(child)
        if (child.type !== 'p') {
          return
        }
        return child
      })}
    </div>
  )
}
function RadioGroup(props) {
  return (
    <div>
      {React.Children.map(props.children, (child) => {
        return React.cloneElement(child, { name: props.name })
      })}
    </div>
  )
}

function Radio({ children, ...rest }) {
  return (
    <label>
      <input type="radio" {...rest} /> {children}
    </label>
  )
}
export default class Composition extends Component {
  render() {
    return (
      <div>
        <WelcomeDialog></WelcomeDialog>
        <Fecth name="getUser">
          {/* props.children可以是任何形式的表达式 */}
          {({ name, age }) => (
            <p>
              {name}-{age}
            </p>
          )}
        </Fecth>
        <FilterP>
          <h3>vue</h3>
          <p>vue cool!</p>
          <h3>react</h3>
          <p>react cool!</p>
        </FilterP>
        {/* 编辑children */}
        <RadioGroup name="mvvm">
          <Radio value="vue">vue</Radio>
          <Radio value="react">react</Radio>
          <Radio value="angular">angular</Radio>
        </RadioGroup>
      </div>
    )
  }
}
