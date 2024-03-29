// pages/home-profile/index.js
import { getUserInfo } from "../../service/api_login"
import { loginStore } from '../../store/index'
Page({
  data: {
    userInfo: {},
    qrCreate: "",
    cookie: ""
  },
  onLoad(options) {
    loginStore.dispatch("getQrCreateAction")
    loginStore.onState("qrCreate", qrCreate => {
      console.log(qrCreate)
      this.setData({ qrCreate })
    })
    if (wx.getStorage('cookie')) {
      this.setData({ cookie: wx.getStorage('cookie') })
    }
  },
  handleGetUser: async function () {
    // 用户信息
    const res = await getUserInfo()
    console.log(res);
    this.setData({ userInfo: res })
  }
})