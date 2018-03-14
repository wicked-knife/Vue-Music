export default function JSONP (config) {
  // 使用promise 封装
  let {
    url,
    params = {},
    callback = 'callback'
  } = config
  return new Promise((resolve, reject) => {
    jsonp(url, params, callback, function (data) {
      resolve(data)
    })
  })
}

function jsonp (url, data, callbackName, callback) {
  // 为回调函数设置唯一的id
  var functionId = 'jsonp' + Date.now()
  // 创建script标签
  var script = document.createElement('script')
  // 处理url地址
  if (isEmptyObject(data)) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + fixURL(data) + `${callbackName}=${functionId}`
  } else {
    url += (url.indexOf('?') === -1 ? '?' : '&') + fixURL(data) + `&${callbackName}=${functionId}`
  }
  // 为script标签设置唯一id
  script.id = functionId
  // 将script标签的src属性指向url
  script.src = url
  // 在window上注册全局方法 json为返回的json数据
  window[functionId] = function (json) {
    // 回调函数
    callback(json)
    document.getElementsByTagName('head')[0].removeChild(script)
    delete window[functionId]
  }
  document.getElementsByTagName('head')[0].appendChild(script)
}

// 根据data拼接url地址
function fixURL (data) {
  let url = ''
  for (let key in data) {
    let value = (data[key] === undefined ? '' : data[key])
    url += `&${key}=${value}`
  }
  return url.substring(1)
}

function isEmptyObject (data) {
  for (let key in data) {
    return false
  }
  return true
}
