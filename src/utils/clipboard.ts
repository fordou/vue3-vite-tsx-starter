import Clipboard from 'clipboard'
import { message } from 'ant-design-vue'

function clipboardSuccess(text:string) {
  message.success(`复制${text}成功`)
}

function clipboardError(text:string) {
  message.error(`复制${text}失败`)
}

/**
 * @description 复制数据
 * @param text
 * @param event
 */
export function clipboard(text:string) {
  const clipboard = new Clipboard(text)
  clipboard.on('success', () => {
    clipboardSuccess(text)
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError(text)
    clipboard.destroy()
  })
}
