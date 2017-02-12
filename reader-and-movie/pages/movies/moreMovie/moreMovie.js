// pages/movies/moreMovie/moreMovie.js
var app = getApp();
var utils = require('../../../utils/utils.js');

Page({
  data: {
    movies: [],
    requestUrl: '',
    totalCount: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = '';
    switch (category) {
      case '即将上映':
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case '正在上映':
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case 'Top250':
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    utils.http(dataUrl, this.processDoubanData);
    
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  // 豆瓣api返回数据处理
  processDoubanData: function(doubanData) {
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
    this.data.totalCount += 20;
    var totalMovies = [];
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
  },
  onReachBottom: function(e) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";

    utils.http(nextUrl, this.processDoubanData);
  },
  onPullDownRefresh: function(event) {
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;

    utils.http(refreshUrl, this.processDoubanData);
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: "/pages/movies/movie-detail/movie-detail?id=" + movieId
    })
  }
})