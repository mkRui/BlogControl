// 首先引入全部模块

const files = require.context('.', false, /\.ts$/)

// 规定 modules 数据 格式 keys:string value: any
const modules: { [keys: string]: any } = {}

console.log(files.keys())

files.keys().forEach((item: string) => {
  const fileName = item.replace(/(\.\/|\.ts)/g, '')
  if (fileName === 'index') {
    return
  }

  modules[fileName] = files(item).default
})

export default modules
