import React from "react"

export default function Text() {
  const [num, setNum] = React.useState(0)
  React.useEffect(() => {
    console.log(num) //执行两次，是为了模拟立即卸载组件和重新挂载组件;React18新增加的特性，仅在开发模式下有，生产环境仅会执行一次
  }, [])
  return <div>这是Text</div>
}
