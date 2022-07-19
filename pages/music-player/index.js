// pages/music-player/index.js
// import { getSongDetail, getSongLyric } from "../../service/api_player"
import { NavigationBarHeight } from "../../device-const/device-const"
import { audioContext, playerStore } from "../../store/player-store"
// import { parseLyric } from "../../utils/parse-lyric"
const playModeNames = ["order", "repeat", "random"]
Page({
  data: {
    id: 0,
    currentSong: {},
    isMusicLyric: true,
    currentPage: 0,
    contentHeight: 0,
    durationTime: 0,
    currentTime: 0,
    sliderValue: 0,
    isPlaying: false,
    isSliderChanging: false,
    lyricInfos: [],
    currentLyricText: "",
    currentLyricIndex: 0,
    lyricScrollTop: 0,
    playModeIndex: 0,
    playModeName: "order"
  },
  onLoad: function (options) {
    const id = options.id
    this.setData({ id })
    this.setupPlayerStoreListener()
    // this.getPageData(id)
    const contentHeight = getApp().globalData.screenHeight - getApp().globalData.statusBarHeight - NavigationBarHeight
    this.setData({ contentHeight })
    //是否显示歌词
    const deviceRadio = getApp().globalData.screenHeight / getApp().globalData.screenWidth
    // console.log(deviceRadio);
    this.setData({ isMusicLyric: deviceRadio > 2 })
    //创建播放器
    // audioContext.stop()
    // audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // // audioContext.autoplay = true
    // audioContext.onCanplay(() => {
    //   audioContext.play()
    // })
    // // 目前播放时间
    // audioContext.onTimeUpdate(() => {
    //   const currentTime = Math.floor(audioContext.currentTime * 1000)
    //   // console.log(currentTime);
    //   //根据当前时间修改滑动条
    //   if (!this.data.isSliderChanging) {
    //     this.setData({ currentTime })
    //     const sliderValue = currentTime / this.data.durationTime * 100
    //     // console.log(sliderValue);
    //     this.setData({ sliderValue })
    //   }
    //   //歌词
    //   for (let i = 0; i < this.data.lyricInfos.length; i++) {
    //     const lyricInfo = this.data.lyricInfos[i]
    //     if (currentTime < lyricInfo.time) {
    //       const currentIndex = i - 1
    //       if (this.data.currentLyricIndex === currentTime) return
    //       const currentLyricText = this.data.lyricInfos[currentIndex].text
    //       // const currentLyricTime = this.data.lyric[currentIndex].time
    //       this.setData({ currentLyricText, currentLyricIndex: currentIndex, lyricScrollTop: currentIndex * 35 })
    //       break;
    //     }
    //   }
    // })
  },
  //网络请求
  // getPageData: function (id) {
  //   getSongDetail(id).then(res => {
  //     this.setData({ currentSong: res.songs[0], durationTime: res.songs[0].dt })
  //   }),
  //     getSongLyric(id).then(res => {
  //       const lyric = parseLyric(res.lrc.lyric)
  //       this.setData({ lyricInfos: lyric })
  //     })
  // },
  handleSliderChange: function (event) {
    // 获取slider变化的值
    const value = event.detail.value
    const currentTime = this.data.durationTime * value / 100
    // console.log(currentTime);
    // 设置context播放currentTime位置的音乐
    // audioContext.pause()
    audioContext.seek(currentTime / 1000)
    this.setData({ sliderValue: value })
    // playerStore.setState("isPlaying", true)
    // audioContext.play()
  },
  //点击
  handleSwiperChange: function (event) {
    const currentPage = event.detail.current
    this.setData({ currentPage })
  },
  //拖拽
  handleSliderChanging: function (event) {
    const value = event.detail.value
    const currentTime = this.data.durationTime * value / 100
    this.setData({ isSliderChanging: true, currentTime: currentTime })
    // playerStore.setState("isPlaying", true)
    // audioContext.play()
  },
  handlePauseClick: function () {
    playerStore.dispatch("changeMusicPlayStatusAction")
    // if (this.data.isPlaying) {
    //   audioContext.pause()
    // } else {
    //   audioContext.play()
    // }
    // this.setData({ isPlaying: !this.data.isPlaying })
  },
  handleBackClick: function () {
    wx.navigateBack()
  },
  handleModeBtnClick: function () {
    let playModeIndex = (this.data.playModeIndex + 1) % 3
    playerStore.setState("playModeIndex", playModeIndex)
  },
  handlePrevBtnClick: function () {
    playerStore.dispatch("changeNewMusicAction", false)
  },
  handleNextBtnClick: function () {
    playerStore.dispatch("changeNewMusicAction")
  },
  //数据监听
  setupPlayerStoreListener: function () {
    playerStore.onStates(["currentSong", "durationTime", "lyricInfos"], ({ currentSong, durationTime, lyricInfos }) => {
      // console.log(currentSong);
      if (currentSong) this.setData({ currentSong })
      if (durationTime) this.setData({ durationTime })
      if (lyricInfos) this.setData({ lyricInfos })
    })
    playerStore.onStates(["currentTime", "currentLyricIndex", "currentLyricText"], ({ currentTime, currentLyricIndex, currentLyricText }) => {
      if (currentTime) {
        if (!this.data.isSliderChanging) {
          this.setData({ currentTime })
          const sliderValue = currentTime / this.data.durationTime * 100
          this.setData({ sliderValue })
        }
      }
      if (currentLyricIndex) this.setData({ currentLyricIndex, lyricScrollTop: currentLyricIndex * 35 })
      if (currentLyricText) this.setData({ currentLyricText })
    })
    playerStore.onState("playModeIndex", playModeIndex => {
      this.setData({ playModeIndex, playModeName: playModeNames[playModeIndex] })
    })
    playerStore.onState("isPlaying", isPlaying => {
      this.setData({ isPlaying })
    })
  },
  onUnload: function () {

  }
})