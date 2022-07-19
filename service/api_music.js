import phRequest from './index'
export function getBanners() {
  return phRequest.get("/banner", {
    type: 2
  })
}
export function getRankings(idx) {
  return phRequest.get("/top/list", {
    idx
  })
}
export function getSongMenu(cat = "全部", limit = 6, offset = 0) {
  return phRequest.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}
export function geteSongMenuDetail(id) {
  return phRequest.get("/playlist/detail/dynamic", {
    id
  })
}
