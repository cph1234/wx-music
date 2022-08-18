// pages/home-music/index.js
import { rankingStore, playerStore } from '../../store/index'
import { getBanners, getSongMenu } from '../../service/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'
const throttleQueryRect = throttle(queryRect, 1000, { trailing: true })
Page({
  data: {
    swiperHeight: 100,
    banners: [],
    recommendSongs: [],
    hotSongMenu: [],
    recommendSongMenu: [],
    rankings: { 0: {}, 1: {}, 2: {} },
    currentSong: {},
    isPlaying: false,
    currentTime: 0,
    durationTime: 0,
    playPercent: ""
  },
  onLoad: function (options) {
    // playerStore.dispatch("playMusicWithSongIdAction", { id: 1842025914 })
    this.getPageData()
    rankingStore.dispatch("getRankingDataAction")
    rankingStore.onState("hotRanking", res => {
      if (!res.tracks) return
      const recommendSongs = res.tracks.slice(0, 6)
      this.setData({ recommendSongs })
    })
    rankingStore.onState("newRanking", this.getRankingHandler(0))
    rankingStore.onState("originRanking", this.getRankingHandler(2))
    rankingStore.onState("upRanking", this.getRankingHandler(3))
    playerStore.onStates(["currentSong", "isPlaying"], ({ currentSong, isPlaying }) => {
      if (currentSong !== undefined) {
        this.setData({ currentSong })
      }
      this.setData({ isPlaying })
    })
    playerStore.onStates(["currentTime", "durationTime"], ({ currentTime, durationTime }) => {
      if (durationTime !== undefined) {
        this.setData({ durationTime })
      }
      this.setData({ currentTime })
      this.setData({ playPercent: this.data.currentTime / this.data.durationTime * 100 + '%' })
    })
  },
  getPageData() {
    getBanners().then(res => {
      // console.log(res);
      this.setData({ banners: res.banners })
    })
    getSongMenu().then(res => {
      this.setData({ hotSongMenu: res.playlists })
    })
    getSongMenu("华语").then(res => {
      this.setData({ recommendSongMenu: res.playlists })
    })
  },
  handleSearchClick: function () {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },
  handleSwiperImageLoaded: function () {
    throttleQueryRect('.swiper-image').then(res => {
      this.setData({ swiperHeight: res[0].height })
    })
  },
  handleMoreClick: function () {
    this.navigateToDetailSongsPage("hotRanking")
  },
  handleRankingItemClick: function (event) {
    //飙升榜：19723756
    //新歌榜：3779629
    //原创榜：2884035
    //热歌榜：3778678
    const rankingMap = { 3779629: "newRanking", 2884035: "originRanking", 19723756: "upRanking" }
    let idx = event.currentTarget.dataset.idx
    if (idx === 0) {
      idx = 3779629
    } else if (idx === 1) {
      idx = 2884035
    } else {
      idx = 19723756
    }
    const rankingName = rankingMap[idx]
    this.navigateToDetailSongsPage(rankingName)
  },
  navigateToDetailSongsPage: function (rankingName) {
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${rankingName}&type=rank`,
    })
  },
  handleSongItemClick: function (event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.recommendSongs)
    playerStore.setState("playListIndex", index)
  },
  handlePlayBtnClick: function () {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },
  handlePlayBarClick: function () {
    wx.navigateTo({
      url: '/pages/music-player/index?id=' + this.data.currentSong.id,
    })
  },
  onUnload: function () {

  },
  getRankingHandler: function (idx) {
    return (res) => {
      if (!res.tracks) return
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const songList = res.tracks.slice(0, 3)
      const playCount = res.playCount
      const rankingObj = { name, coverImgUrl, songList, playCount }
      const rankings = { ...this.data.rankings, [idx]: rankingObj }
      this.setData({ rankings })
    }
  }
})