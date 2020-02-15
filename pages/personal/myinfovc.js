// pages/personal/myinfovc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: ["动态", "专栏9", "沸点9", "分享9", "赞"],
    tab: 0,
  },
  // segement 顶部根据滚动悬停
  onPageScroll: function (a) {
    var t = this;
    a.scrollTop > 576 ? t.setData({
      menuFixed: !0
    }) : t.setData({
      menuFixed: !1
    });
  },
  
  nav: function (a) {
    wx.showToast({
      title: `点击了第${a.currentTarget.dataset.tab}个 tab`,
      icon: "none"
    })
    console.log(a);
    var t = this;
    // t.data.arrList = [], t.data.list = [],
    t.setData({
      tab: a ? a.currentTarget.dataset.tab : t.data.tab,
      // page: 1,
      // arrList: [],
      // list: [],
      // htmlShow: !1,
      // complete: !1
    })
    // t.load();
  },
  handleChange({ detail }) {
    console.log(detail);
    wx.showToast({
      title: `切换到标签 ${detail.key}`,
      icon: 'none'
    });
    this.setData({
      current: detail.key
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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