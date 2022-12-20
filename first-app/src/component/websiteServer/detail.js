import React from "react"
class ArticleDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return <div>article detail</div>
  }
}
export default ArticleDetail
