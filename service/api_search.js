import phRequest from './index'
export function getSearchHot() {
  return phRequest.get("/search/hot")
}
export function getSearchSuggest(keywords) {
  return phRequest.get("/search/suggest", {
    keywords,
    type: "mobile"
  })
}
export function getSearchResult(keywords) {
  return phRequest.get("/search", {
    keywords
  })
}