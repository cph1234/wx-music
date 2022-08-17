import { HYEventStore } from "hy-event-store"
import { getQrKey, getQrCreate, getQrCheck } from '../service/api_login'

const loginStore = new HYEventStore({
  state: {
    qrCreate: "",
    loginSuccess: false,
    qrCheck: {}
  },
  actions: {
    getQrCreateAction(ctx) {
      getQrKey().then(res => {
        // console.log(res.data.unikey)
        getQrCreate(res.data.unikey).then(res2 => {
          // console.log(res2)
          ctx.qrCreate = res2
        })
        //获取状态
        let timer = setInterval(async () => {
          const statusRes = await getQrCheck(res.data.unikey)
          if (statusRes.code === 800) {
            // alert('二维码已过期,请重新获取')
            clearInterval(timer)
          }
          if (statusRes.code === 803) {
            // 这一步会返回cookie
            clearInterval(timer)
            // alert('授权登录成功')
            ctx.qrCheck = statusRes
            // console.log(statusRes);
            ctx.loginSuccess = true
            wx.setStorage('cookie', statusRes.cookie)
            // let userAccount = await getUserAccount()
            console.log(statusRes.cookie);
            // dispatch(getUserInformationAction(userAccount.account.id))
            // storageUtils.saveUser(userAccount, statusRes.cookie)
          }
        }, 3000)
      })
    }
  }
})

export {
  loginStore
}