App({
    globalData: {
        userInfo: null,
        g_isPlayingMusic: false,
        g_currentMusicPostId: null,
        doubanBase: "https://api.douban.com"
    },
    getUserInfo: function (cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res){
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo);
                        }
                    })
                }
            })
        }
    }
})