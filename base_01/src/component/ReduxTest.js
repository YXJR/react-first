import React, { Component } from 'react'
//import Store from '../store'
import { connect } from 'react-redux'
import { add, minus, asyncAdd } from '../store/Counter.redux'

// const mapStateToProps = (state) => ({
//   num: state.counter,
// })
// const mapDispatchToProps = (dispatch) => {
//   return {
//     add,
//     minus,
//     asyncAdd,
//   }
// }
@connect(
  (state) => ({ num: state.counter }), // 状态映射,
  {
    add,
    minus,
    asyncAdd,
  }
)
class ReduxTest extends Component {
  render() {
    return (
      <div>
        <p>{this.props.num}</p>
        <div>
          <button onClick={() => this.props.minus()}>-</button>
          <button onClick={() => this.props.add()}>+</button>
          <button onClick={() => this.props.asyncAdd()}>asyncAdd</button>
        </div>
      </div>
    )
  }
}
export default ReduxTest
