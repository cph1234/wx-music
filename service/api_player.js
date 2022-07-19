import phRequest from './index'
export function getSongDetail(ids) {
  return phRequest.get("/song/detail", {
    ids
  })
}
export function getSongLyric(id) {
  return phRequest.get("/lyric", {
    id
  })
}