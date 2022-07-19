// components/video-item-v2/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      default: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleVideoCommendClick: function (event) {
      const id = event.currentTarget.dataset.item.creator[0].userId
      // wx.navigateTo({
      //   url: '/pages/detail-video/index?id=' + id,
      // })
    }
  }
})
