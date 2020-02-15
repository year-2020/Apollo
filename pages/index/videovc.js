// pages/index/videovc.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cellType: 1,//0表示小的item，1表示大的item
    onlineDic:[],
    proVideoDic:[],
    publicVideoDic:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that  = this;
    // app.api._fetch({
    //   url: '/community/video/xcxlist',
    //   data: {},
    // }).then(function (res) {
    //   that.setData({
    //     videoList: res.data.rows
    //   });
    //   // console.info('视频教程的返回' + JSON.stringify(that.data.videoList))

    // }).catch(function (error) {
    //   console.log(error);
    // });
    that.getvideoData();
  },
/**获得第一个视频页面的数据 */
getvideoData:function(){
  const that = this;
  app.api._fetch({
    url: '/xcxvideo',
    data: {},
  }).then(function (res) {
    that.setData({
      onlineDic:res.data[0],
      proVideoDic: res.data[1],
      publicVideoDic: res.data[2]
    });
    console.info('视频页面的返回' + JSON.stringify(that.data.onlineDic))

  }).catch(function (error) {
    console.log(error);
  });
},
/**跳去直播页面 */
  jumpToOnlineVideos:function(e){
    console.info('online要传递的 id=' + e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/videoPackage/onlineVideo' + '?onlineId=' + e.currentTarget.dataset.id,
    })
  },
/**专题页面(点击查看更多) */
  // jumpMore:function(){
  //     wx.navigateTo({
  //       url: '/pages/videoPackage/videopro',
  //     })
  // },
  /**专题页面(点击查看更多) */
  jumpToPro: function (e) {
    console.info('categoryId=多少的呢' + e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/videoPackage/videoplayer' + '?categoryId=' + e.currentTarget.dataset.id,
    })
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