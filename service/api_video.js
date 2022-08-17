import phRequest from "./index"
export function getTopMV(offset, limit = 10) {
  return phRequest.get("/top/mv", {
    offset,
    limit,
    cookie: wx.getStorage("cookie")
  })
}
export function getMVURL(id) {
  return phRequest.get("/mv/url", {
    id,
    cookie: wx.getStorage("cookie")
  })
}
export function getMVDetail(id) {
  return phRequest.get("/mv/detail", {
    mvid: id,
    cookie: wx.getStorage("cookie")
  })
}
export function getRelatedVideo(id) {
  return phRequest.get("/related/allvideo", {
    id,
    cookie: wx.getStorage("cookie")
  })
}