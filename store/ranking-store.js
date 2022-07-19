import { HYEventStore } from "hy-event-store"
import { getRankings } from '../service/api_music'
export const rankingStore = new HYEventStore({
  state: {
    newRanking: {},
    hotRanking: {},
    originRanking: {},
    upRanking: {}
  },
  actions: {
    //0：新歌榜 1：热歌榜 2：原创榜 3：飙升榜
    getRankingDataAction(ctx) {
      for (let i = 0; i < 4; i++) {
        getRankings(i).then(res => {
          switch (i) {
            case 0:
              ctx.newRanking = res.playlist
              break;
            case 1:
              ctx.hotRanking = res.playlist
              break;
            case 2:
              ctx.originRanking = res.playlist
              break;
            case 3:
              ctx.upRanking = res.playlist
              break;
          }
        })
      }
    }
  }
})