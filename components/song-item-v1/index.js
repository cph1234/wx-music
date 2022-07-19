// components/song-item-v1/index.js
import { playerStore } from '../../store/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
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
    handleSongItemClick: function (event) {
      const id = event.currentTarget.dataset.id
      console.log(id);
      //页面跳转
      wx.navigateTo({
        url: `/pages/music-player/index?id=${id}`,
      })
      //请求数据
      playerStore.dispatch("playMusicWithSongIdAction", { id })
      //播放列表
      
    }
  }
})
