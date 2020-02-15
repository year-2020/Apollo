// pages/videoPackage/videopro.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ["硬件", "软件","远端","量产"],
    tab: 0,
    videoList:[],
    tonewvideo:1


  },
  nav: function (a) {
    
    if (a.currentTarget.dataset.tab != 0) {//实时
      wx.showToast({
        // title: `点击了第${a.currentTarget.dataset.tab}个 tab`,
        // icon: "none"
        title: '敬请期待',
        icon: 'none'
      })
    }
    var t = this;
    t.setData({
      tab: a ? a.currentTarget.dataset.tab : t.data.tab,
    
    })
  
    },
    /**其实是跳去视频详情 */
  jumpToPro:function(e){
    console.info('categoryId=多少的呢' + e.currentTarget.dataset.id);

    wx.navigateTo({
      url: '/pages/videoPackage/videoplayer' + '?categoryId=' + e.currentTarget.dataset.id,
    })
  },
  getcategoryList: function (categoryId){
      const that = this;
      app.api._fetch({
        url: '/community/video/xcxcategory',
        data: { 'categoryId': categoryId},
      }).then(function (res) {
        that.setData({
         videoList:res.data.rows
        });
        console.info('分类列表的返回' + JSON.stringify(that.data.videoList))

      }).catch(function (error) {
        console.log(error);
      });
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const that = this;
    that.getcategoryList(options.categoryId);
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