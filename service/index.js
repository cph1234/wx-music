const BASE_URL = "https://netease-cloud-music-api-mauve-nu.vercel.app/"
const LOGIN_URL = "https://netease-cloud-music-api-mauve-nu.vercel.app/"
const token = wx.getStorageSync('token')
class PHRequest {
  constructor(baseURL, authHeader = {}) {
    this.baseURL = baseURL
    this.authHeader = authHeader
  }
  request(url, method, params, isAuth = false, header = {}) {
    const finalHeader = isAuth ? { ...this.authHeader, header } : header
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseURL + url,
        method: method,
        header: finalHeader,
        data: params,
        success: function (res) {
          resolve(res.data)
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
  }
  get(url, params, isAuth = false, header = {}) {
    return this.request(url, "GET", params, isAuth, header)
  }
  post(url, data, isAuth = false, header = {}) {
    return this.request(url, "POST", data, isAuth, header)
  }
}

const phRequest = new PHRequest(BASE_URL)
const phLoginRequest = new PHRequest(LOGIN_URL, { token })
export default phRequest
export {
  phLoginRequest
}
