import phRequest from "./index"
export function getTopMV(offset, limit = 10) {
  return phRequest.get("/top/mv", {
    offset,
    limit
  })
}
export function getMVURL(id) {
  return phRequest.get("/mv/url", {
    id
  })
}
export function getMVDetail(id) {
  return phRequest.get("/mv/detail", {
    mvid: id
  })
}
export function getRelatedVideo(id) {
  return phRequest.get("/related/allvideo", {
    id
  })
}