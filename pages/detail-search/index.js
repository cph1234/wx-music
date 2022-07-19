// pages/detail-search/index.js
import { getSearchHot, getSearchSuggest, getSearchResult } from '../../service/api_search'
import debounce from "../../utils/debounce"
import { stringToNodes } from '../../utils/sting2nodes'
import { playerStore} from '../../store/index'
const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeywords: [],
    suggestSongs: [],
    suggestSongsNodes: [],
    searchValue: "",
    resultSongs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData()
  },
  getPageData: function () {
    getSearchHot().then(res => {
      this.setData({ hotKeywords: res.result.hots })
    })
  },
  handleSearchChange: function (event) {
    const searchValue = event.detail
    // console.log(searchValue);
    this.setData({ searchValue })
    if (!searchValue.length) {
      this.setData({ suggestSongs: [] })
      this.setData({ resultSongs: [] })
      debounceGetSearchSuggest.cancel()
      return
    }
    debounceGetSearchSuggest(searchValue).then(res => {
      const suggestSongs = res.result.allMatch
      this.setData({ suggestSongs })
      if (!suggestSongs) return
      //转成nodes节点
      const suggestKeywords = suggestSongs.map(item => item.keyword)
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchValue)
        suggestSongsNodes.push(nodes)
      }
      this.setData({ suggestSongsNodes })
    })
  },
  handleSearchAction: function () {
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then(res => {
      this.setData({ resultSongs: res.result.songs })
    })
  },
  handleSuggestItemClick: function (event) {
    const index = event.currentTarget.dataset.index
    const keyword = this.data.suggestSongs[index].keyword
    this.setData({ searchValue: keyword })
    getSearchResult(keyword).then(res => {
      this.setData({ resultSongs: res.result.songs })
    })
  },
  handleTagItemClick: function (event) {
    const keyword = event.currentTarget.dataset.keyword
    this.setData({ searchValue: keyword })
    getSearchResult(keyword).then(res => {
      this.setData({ resultSongs: res.result.songs })
    })
  }
  
})