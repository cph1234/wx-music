import { HYEventStore } from "hy-event-store"
import { getSongDetail, getSongLyric } from "../service/api_player"
import { parseLyric } from "../utils/parse-lyric"

// const audioContext = wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager()
const playerStore = new HYEventStore({
  state: {
    isFirstPlay: true,
    id: 0,
    currentSong: {},
    durationTime: 0,
    lyricInfos: [],
    currentTime: 0,
    currentLyricIndex: 0,
    currentLyricText: "",
    playModeIndex: 0,
    isPlaying: false,
    playListSongs: [],
    playListIndex: 0,
    isStop:false
  },
  actions: {
    //网络请求
    playMusicWithSongIdAction(ctx, { id, isRefresh = false }) {
      if (ctx.id == id && !isRefresh) {
        ctx.isPlaying = true
        audioContext.play()
        return
      }
      //播放新歌曲进行重置
      ctx.isPlaying = true
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ""
      //修改播放状态
      ctx.id = id
      getSongDetail(id).then(res => {
        console.log(res);
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
        audioContext.title = res.songs[0].name
      })
      getSongLyric(id).then(res => {
        const lyric = parseLyric(res.lrc.lyric)
        ctx.lyricInfos = lyric
      })
      //创建播放器
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.title = id
      audioContext.autoplay = true
      //仅第一次创建监听
      if (ctx.isFirstPlay) {
        this.dispatch("setupAudioContextListenerAction")
        ctx.isFirstPlay = false
      }
    },
    setupAudioContextListenerAction(ctx) {
      audioContext.onCanplay(() => {
        audioContext.play()
      })
      // 监听时间更改
      audioContext.onTimeUpdate(() => {
        // 获取当前时间
        const currentTime = Math.floor(audioContext.currentTime * 1000)
        ctx.currentTime = currentTime
        // 当前歌词
        if (!ctx.lyricInfos.length) return
        for (let i = 0; i < ctx.lyricInfos.length; i++) {
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) {
            const currentIndex = i - 1
            if (ctx.currentLyricIndex === currentIndex) return
            const currentLyricText = ctx.lyricInfos[currentIndex].text
            ctx.currentLyricIndex = currentIndex
            ctx.currentLyricText = currentLyricText
            break;
          }
        }
      })
      //监听歌曲播放完成
      audioContext.onEnded(() => {
        this.dispatch("changeNewMusicAction")
      })
      //音乐暂停播放
      audioContext.onPlay(() => {
        ctx.isPlaying = true
      })
      audioContext.onPause(() => {
        ctx.isPlaying = false
      })
      audioContext.onStop(()=>{
        ctx.isPlaying=false
        ctx.isStop=true
      })
    },
    changeMusicPlayStatusAction(ctx, isPlaying) {
      ctx.isPlaying = !ctx.isPlaying
      if(ctx.isPlaying&&ctx.isStop){
        audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
        audioContext.title = currentSong.name
        audioContext.startTime=ctx.currentTime/1000
        ctx.isStop=false
      }
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
    },
    changeNewMusicAction(ctx, isNext = true) {
      let index = ctx.playListIndex
      //0顺序，1单曲，2随机
      switch (ctx.playModeIndex) {
        case 0:
          index = isNext ? index + 1 : index - 1
          if (index === -1) index = ctx.playListSongs.length - 1
          if (index === ctx.playListSongs.length) index = 0
          break
        case 1:
          break
        case 2:
          index = Math.floor(Math.random * ctx.playListSongs.length)
          break
      }
      ctx.playListIndex = index
      let currentSong = ctx.playListSongs[index]
      if (!currentSong) currentSong = ctx.currentSong
      this.dispatch("playMusicWithSongIdAction", { id: currentSong.id, isRefresh: true })
    }
  }
})
export {
  audioContext,
  playerStore
}