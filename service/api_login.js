import { phLoginRequest } from "./index"
export function getLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success: res => {
        const code = res.code
        resolve(code)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export function codeToToken(code) {
  return phLoginRequest.post("/login", { code })
}

export function checkToken() {
  return phLoginRequest.post("/auth", {}, true)
}
export function postFavorRequest(id) {
  return phLoginRequest.post("/api/favor", { id }, true)
}

export function checkSession() {
  return new Promise((resolve) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      }, fail: () => {
        resolve(false)
      }
    })
  })
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '你好啊',
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}