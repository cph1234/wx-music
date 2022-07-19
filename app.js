// app.js
import { getLoginCode, codeToToken, checkToken, checkSession } from "./service/api_login"
App({
  onLaunch: function () {
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
    this.handleLogin()
    
  },
  handleLogin: async function () {
    //登录(验证token，token是否过期，session是否过期)
    const token = wx.getStorageSync('token')
    const checkResult = await checkToken()
    const isSessionExpire = await checkSession()
    if (!token || checkResult.errorCode || isSessionExpire) {
      this.loginAction()
    }
  },
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0
  },
  loginAction: async function () {
    // 获取code
    const code = await getLoginCode()
    const result = await codeToToken(code)
    const token = result.token
    wx.setStorageSync('token', token)
  }
})
