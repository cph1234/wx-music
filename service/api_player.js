import phRequest from './index'
export function getSongDetail(ids) {
  return phRequest.get("/song/detail", {
    ids,
    cookie: wx.getStorage("cookie")
  })
}
export function getSongLyric(id) {
  return phRequest.get("/lyric", {
    id,
    cookie: wx.getStorage("cookie")
  })
}