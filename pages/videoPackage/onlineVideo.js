// pages/videoPackage/onlineVideo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList:[]
  },
  getcategoryList: function (categoryId) {
    const that = this;
    app.api._fetch({
      url: '/community/video/xcxcategory',
      data: {'categoryId':categoryId},
    }).then(function (res) {
      that.setData({
        videoList: res.data.rows
      });
      console.info('onlineVideo列表的返回' + JSON.stringify(that.data.videoList))

    }).catch(function (error) {
      console.log(error);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.getcategoryList(options.onlineId);
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