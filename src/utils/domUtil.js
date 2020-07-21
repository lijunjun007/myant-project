import config from '@/config/defaultSettings'

export const setDocumentTitle = function (title) {
  document.title = title
  const ua = navigator.userAgent// 浏览器/设备信息
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/  // 识别 MicroMessenger 这个关键字来确定是否微信内置的浏览器
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

export const domTitle = config.title
