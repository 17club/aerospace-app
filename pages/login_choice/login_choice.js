// pages/login_choice/login_choice.js
import { request, ApiPath } from '../../utils/api'
import { jobAfterLogin } from '../login/util'

Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  onWechatLogin() {
    wx.login({
      async success(res) {
        if (res.code) {
          const { is_bound, token } = await request(ApiPath.login, { wx_code: res.code })
          if (!is_bound) {
            wx.redirectTo({
              url: '/pages/login/login?wx_bind=true',
            })
            return
          }
          jobAfterLogin(res.empolyee_id)
        } else {
          wx.showToast({
            title: '登录失败！' + res.errMsg,
          })
        }
      }
    })
  },
  onUsernameLogin() {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.setNavigationBarColor({
      backgroundColor: '#357AFF',
      frontColor: '#ffffff',
    })
    const res = await request(ApiPath.userInfo)
    if (res.user_name) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})