import React, { Component, PureComponent } from 'react'
// 函数型组件在父组件更改状态时会引起render函数的重绘,影响性能
// function List({ data }) {
//   console.log({ data })
//   return (
//     <div>
//       <p>{data.body}</p>
//       <p>{data.author}</p>
//     </div>
//   )
// }
// 函数型组件在父组件更改状态时会引起render函数的重绘,影响性能,因而在生命周期shouldComponentUpdate里做了比较
//class List extends Component {
//   shouldComponentUpdate(nextProps) {
//     if (
//       nextProps.data.body === this.props.data.body &&
//       nextProps.data.author === this.props.data.author
//     ) {
//       return false;
//     }
//     return true;
//   }

//   render() {
//     console.log('render')
//     console.log(this.props)

//     return (
//       <div>
//         <p>{this.props.data.body}</p>
//         <p>------{this.props.data.author}</p>
//       </div>
//     )
//   }
// }

//PureComponent是将shuldComponentUpdate函数中的比较做了封装,但是是浅比较
//使用PureComponent的原则:1.确保数据类型是值类型 2.如果是引用类型,确保地址不变,且数据没有深层次的变化
//可以将数据解套 ...语法
//class List extends PureComponent {
//   render() {
//     console.log('render')
//     console.log(this.props)

//     return (
//       <div>
//         <p>{this.props.data.body}</p>
//         <p>------{this.props.data.author}</p>
//       </div>
//     )
//   }
// }

//memo可以直接使用函数型组件 ,使函数型组件可以向pureComponent组件进化
const List = React.memo(({ data }) => {
  console.log('render')
  return (
    <div>
      <p>{data.body}</p>
      <p>{data.author}</p>
    </div>
  )
})
//组件复合而非组件继承

export default class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        comments: [
          {
            body: 'Vue is really good',
            author: 'youyuxi',
          },
          {
            body: 'React is really good',
            author: 'faceBook',
          },
        ],
      })
    }, 1000)
  }
  render() {
    return (
      <div>
        {this.state.comments.map((v, i) => (
          <List key={i} data={v}></List>
        ))}
      </div>
    )
  }
}
