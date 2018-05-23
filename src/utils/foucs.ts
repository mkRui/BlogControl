import { DirectiveOptions } from 'vue'
const focus: DirectiveOptions = {
  inserted(el, option) {
    var defClass: string = 'el-input'
    var defTag: string = 'input'
    var value = option.value || true
    if (typeof value === 'boolean') {
      value = { cls: defClass, tag: defTag, foc: value }
    } else {
      value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false }
    }
    if (el.classList.contains(value.cls) && value.foc) {
      el.getElementsByTagName(value.tag)[0].focus()
    }
  }
}
export default focus
