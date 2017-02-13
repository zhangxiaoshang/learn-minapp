# learn-minapp

### 项目简介

集文章阅读，音乐播放，豆瓣电影为一体的小程序DEMO.

### 效果图
![page](http://oigrj4b52.bkt.clouddn.com/image/github/repository/learn-minapp/post.png)
![page-detail](http://oigrj4b52.bkt.clouddn.com/image/github/repository/learn-minapp/post-detail.png)
![movie](http://oigrj4b52.bkt.clouddn.com/image/github/repository/learn-minapp/movie.png)
![movie-detail](http://oigrj4b52.bkt.clouddn.com/image/github/repository/learn-minapp/movie-detail.png)

### 功能说明

文章阅读：swiper轮播图、背景音乐、showTast

豆瓣电影：接口访问来自豆瓣api，目前功能有：电影搜索、下拉刷新、上拉加载

#### 代码说明

部分采用es6语言，组件化，模块化开发。

### 下载&启动

~~~
# git clone git@github.com:zhangxiaoshang/learn-minapp.git

使用微信web开发者工具（项目开发时使用的版本：v0.14.140900）创建项目，打开 ./learn-minapp/reader-and-movie/
~~~
Tip: 如果只是想查看demo运行效果，创建项目时建议选择**无AppID**；
本项目使用了豆瓣的公开api, 如果创建项目时配置了AppID,若想正常请求数据，需小程序管理员（开发者无此权限）在后台将豆瓣的api地址：**https://api.douban.com** 添加到**request合法域名**列表，首次添加大概10分钟后才能生效，或者修改项目配置：**微信web开发者工具 => 项目 => 基础信息 => 开发环境不校验请求域名以及TLS版本（勾选）**