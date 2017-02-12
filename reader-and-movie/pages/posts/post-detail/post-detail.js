var postData = require("../../../data/post-data.js");
var app = getApp();

Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (options) {
    var that = this;
    // 生命周期函数--监听页面加载
    var id = options.id;
    this.setData({ postId: id });
    var postContent = postData.postlist[id];
    this.setData(postContent);
    //读取收藏状态
    var postsCollected = wx.getStorageSync("posts_collected");
    if (postsCollected) {
      var postCollected = postsCollected[id];
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[id] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    // 页面加载时判断音乐播放状态
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === this.data.postId) {
      this.setData({
        isPlayingMusic: true
      })
    }

    this.setMusicMonitor();

  },

  // 背景音乐播放状态
  setMusicMonitor: function () {
    var that = this;
    // 音乐播放
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.postId;
    })
    // 音乐暂停
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
  },


  onTapCollection: function (event) {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.postId]

    var collected = !postCollected;
    this.setData({
      collected: collected
    })
    postsCollected[this.data.postId] = collected;
    wx.setStorageSync('posts_collected', postsCollected);
    wx.showToast({
      title: collected ? "收藏成功" : "取消收藏"
    })
  },

  // 同步
  getPostsCollectedSync: function () {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.postId];
    return postCollected;
  },
  showActionSheet: function () {
    var itemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到到QQ',
      '分享到微博'
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#0000ff',
      success: function (res) {
        console.log(res);
      }
    })
  },

  //  背景音乐
  onMusicTap: function () {
    var currentPostId = this.data.postId;
    var currentPostData = postData.postlist[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: currentPostData.music.url,
        title: currentPostData.music.title,
        coverImg: currentPostData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }

  }

})