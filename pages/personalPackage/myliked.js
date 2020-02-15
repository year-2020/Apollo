// pages/personalPackage/myliked.js
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    rows: [],
    fromCollectvc: 1,
    nodata: !0,
    nodatamsg: ''
  },
  /**跳去个人主页 */
  itemClick: function (e) {
    console.log(e)
  if(e.currentTarget.dataset.jump == 'Y'){
    wx.navigateTo({
      url: '../logs/logs' + '?activityUrl=' + encodeURIComponent(e.currentTarget.dataset.source)
    })
  }else{

    wx.navigateTo({
      url: '/pages/articlevc/articlevc' + '?articleId=' + e.currentTarget.dataset.id + '&tag='+e.currentTarget.dataset.type,
    })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const that = this;
    /**收藏列表的数据 */
    app.api._fetch({
      url: '/user/mylike',
      data: {},
    }).then(function (res) {
      console.info('/user/myfollow返回' + JSON.stringify(res))
      that.setData({
        rows: res.data.rows
      });
      if (res.data.rows.length == 0) {//
        that.setData({
          nodata: 0,
          nodatamsg: '暂无数据'
        })

      }

    }).catch(function (error) {
      console.log(error);
    });
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