// components/navigation-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true
  },
  properties: {
    title: {
      type: String,
      value: "默认"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight
  },
  lifetimes: {
    ready: function () {
      const info = wx.getSystemInfoSync()

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleLeftClick:function(){
      //发射事件
      this.triggerEvent('click')
    }
  }
})
