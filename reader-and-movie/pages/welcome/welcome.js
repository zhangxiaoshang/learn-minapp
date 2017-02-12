// welcome/welcome.js
var app = getApp();

Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    app.getUserInfo ( (userInfo) => {
      this.setData({
        userInfo: userInfo
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: '小程序之旅',
      desc: '就是BUG多点儿，其它都还好',
      path: '/pages/welcome/welcome'
    }
  },
  onTap: function () {
    wx.switchTab({
      url: "../posts/posts"
    })
  }
})