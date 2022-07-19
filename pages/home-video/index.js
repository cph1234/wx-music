// pages/home-video/index.js
import { getTopMV } from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMvs: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // wx.showNavigationBarLoading()
    // const res = await getTopMV(0)
    // this.setData({ topMvs: res.data })
    // wx.hideNavigationBarLoading()
    // wx.stopPullDownRefresh()
    this.getTopMVData(0)
  },
  //封装网络请求
  getTopMVData: async function (offset) {
    if (!this.data.hasMore && offset !== 0) return
    wx.showNavigationBarLoading()
    const res = await getTopMV(offset)
    let newData = this.data.topMvs
    if (offset === 0) {
      newData = res.data
    } else {
      newData = newData.concat(res.data)
    }
    this.setData({ topMvs: newData })
    this.setData({ hasMore: res.hasMore })
    if (offset == 0) {
      wx.stopPullDownRefresh()
    }
    wx.hideNavigationBarLoading()
  },
  //点击事件
  handleVideoItemClick: function (event) {
    const id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '/pages/detail-video/index?id=' + id,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    // wx.showNavigationBarLoading()
    // const res = await getTopMV(0)
    // this.setData({ topMvs: res.data })
    // wx.hideNavigationBarLoading()
    // wx.stopPullDownRefresh()
    this.getTopMVData(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    // if (!this.data.hasMore) return
    // wx.showNavigationBarLoading()
    // const res = await getTopMV(this.data.topMvs.length)
    // this.setData({ topMvs: this.data.topMvs.concat(res.data) })
    // this.setData({ hasMore: res.hasMore })
    // wx.hideNavigationBarLoading()
    this.getTopMVData(this.data.topMvs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})