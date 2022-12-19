/**
 * antd的Input封装一层
 */
import { Input } from "antd"

function InputexAntd(props) {
  const {
    allowClear,
    bordered,
    disabled,
    status,
    placeholder,
    showCount,
    maxLength,
    changeCallback,
  } = props
  let changeCallbacks = (event) => {
    //TODO: AOP 可以加防抖
    changeCallback(event.target.value)
  }
  return (
    <Input
      placeholder={placeholder}
      allowClear={allowClear}
      bordered={bordered}
      disabled={disabled}
      status={status}
      showCount={showCount}
      maxLength={maxLength}
      onChange={changeCallbacks}
    />
  )
}
export default InputexAntd
