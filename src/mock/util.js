const responseBody = {
  message: '',
  timestamp: 0,
  result: null,
  code: 0
}

export const builder = (data, message, code = 0, headers = {}) => {
  // 二次封装响应数据data---->response
  responseBody.result = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

export const getQueryParameters = (options) => {
  // 处理url的参数--->参数的对象
  const url = options.url
  // http://www.xxx.com/Show.asp?id=77&nameid=2905210001&page=1
  const search = url.split('?')[1]
  // id=77&nameid=2905210001&page=1
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
  // url解码    encodeURIComponent  url编码
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
    // 转换成对象字符串--parse-->参数的对象
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}
