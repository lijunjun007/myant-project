import request from '@/utils/request'
function http (uri, method, parameter) {
  return request({
    url: uri,
    method: method,
    params: parameter
  })
}
export {
  http
}
