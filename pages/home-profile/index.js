// pages/home-profile/index.js
import { getUserInfo } from "../../service/api_login"
Page({
  data: {
    userInfo: {}
  },
  onLoad(options) {

  },
  handleGetUser: async function () {
    // 用户信息
    const res = await getUserInfo()
    console.log(res);
    this.setData({ userInfo: res })
  }
})