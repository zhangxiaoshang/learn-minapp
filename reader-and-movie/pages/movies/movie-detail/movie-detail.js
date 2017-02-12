// pages/movies/movie-detail/movie-detail.js
import {Movie} from "class/Movie.js";
var app = getApp();
var utils = require("../../../utils/utils.js");

Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    var that = this;
    var movieId = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;

    var movie = new Movie(url);
    movie.getMovieData(function (movie){
      that.setData({
        movie: movie
      })
    })
  },
  previewImage: function(event) {
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src,src]
    })
  }
})