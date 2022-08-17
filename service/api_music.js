import phRequest from './index'
export function getBanners() {
  return phRequest.get("/banner", {
    type: 2,
    cookie: wx.getStorage("cookie")
  })
}
export function getRankings(id) {
  return phRequest.get("/playlist/detail", {
    id,
    cookie: wx.getStorage("cookie")
  })
}
export function getSongMenu(cat = "全部", limit = 6, offset = 0) {
  return phRequest.get("/top/playlist", {
    cat,
    limit,
    offset,
    cookie: wx.getStorage("cookie")
  })
}
export function geteSongMenuDetail(id) {
  return phRequest.get("/playlist/detail", {
    id,
    cookie: wx.getStorage("cookie")
  })
}
