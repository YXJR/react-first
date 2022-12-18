/**
 * 封装一层 modal
 */

import { Modal } from "antd"
const { confirm } = Modal
export default function confirms(config) {
  const { text, onOkHook, onCancelHook } = config
  confirm({
    title: "提示",
    content: `${text}`,
    okText: "确定",
    cancelText: "取消",
    onOk() {
      onOkHook()
    },
    onCancel() {
      onCancelHook()
    },
  })
}
