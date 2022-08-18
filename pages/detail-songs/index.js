// pages/detail-songs/index.js
import { rankingStore, playerStore } from '../../store/index'
import { geteSongMenuDetail } from '../../service/api_music'
Page({
  data: {
    ranking: "",
    songInfo: {},
    type: ""
  },
  onLoad: function (options) {
    const type = options.type
    this.setData({ type })
    if (type === "menu") {
      const id = options.id
      geteSongMenuDetail(id).then(res => {
        this.setData({ songInfo: res.playlist })
      })
    } else if (type === "rank") {
      const ranking = options.ranking
      this.setData({ ranking })
      rankingStore.onState(ranking, this.getRankingDataHandler)
    }
  },
  onUnload: function () {
    if (this.data.ranking) {
      rankingStore.offState(this.data.ranking, this.getRankingDataHandler)
    }
  },
  getRankingDataHandler: function (res) {
    this.setData({ songInfo: res })
  },
  handleSongItemClick: function (event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.songInfo.tracks)
    playerStore.setState("playListIndex", index)
  }
})