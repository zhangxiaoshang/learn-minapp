// pages/movies/movies.js
var utils = require('../../utils/utils.js');
var app = getApp();
Page({
  data: {
    inputText: "",
    containerShow: true,
    searchPanelShow: false,
    in_theaters: {},
    coming_soon: {},
    top250: {},
    searchResult: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var in_theaters = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var coming_soon = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250 = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(in_theaters, 'in_theaters', "正在上映");
    this.getMovieListData(coming_soon, 'coming_soon', "即将上映");
    this.getMovieListData(top250, 'top250', 'Top250');

  },
  onShareAppMessage: function () {
    return {
      title: '豆瓣电影',
      desc: '就是BUG多点儿，其它都还好',
      path: 'pages/movies/movies'
    }
  },
  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        that.processDoubanData(res.data, settedKey, categoryTitle);
      }
    })
  },
  // 豆瓣api返回数据处理
  processDoubanData: function (doubanData, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in doubanData.subjects) {
      var movie = doubanData.subjects[idx];
      var title = movie.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        title: title,
        coverageUrl: movie.images.large,
        average: movie.rating.average,
        stars: utils.convertToStarsArray(movie.rating.stars),
        id: movie.id
      };

      movies.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData);
  },
  // 更多
  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: '/pages/movies/moreMovie/moreMovie?category=' + category
    })
  },
  onBindInput: function(event) {
    var text = event.detail.value;
    this.setData({
      inputText: text
    })
  },
  onBindFocus: function () {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  onCancelImgTap: function () {
    this.setData({
      inputText: "",
      searchResult: {},
      containerShow: true,
      searchPanelShow: false
    })
  },
  onBindBlur: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q={" + text + "}";
    this.getMovieListData(searchUrl, "searchResult", "");
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "/pages/movies/movie-detail/movie-detail?id=" + movieId
    })
  }
})