// pages/index/creditstore.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ico: "/static/images/v2_plgz3l.jpg",
    tabArr: ["换购", "夺宝"],
     tab: 0,
    cards:[],
    subjects: [], 
    credits:'',
    totalCredits:''


  },
  jumpTodetailVc:function(e){

    wx.navigateTo({
      url: '/pages/creditvc/exchangevc' + '?goodsId=' + e.currentTarget.dataset.id,
    })
  },
  jumpTocreditphVc:function(){
    wx/wx.navigateTo({
      url: '/pages/creditsubPackage/creditphVc',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  jumpToOrderList:function(){
    wx.navigateTo({
      url: '/pages/creditsubPackage/orderListVc',
    })
  },
  nav: function (a) {
   
    if (a.currentTarget.dataset.tab == 0) {//实时
      // this.getQuestionList('latest');
      var t = this;
      // t.data.arrList = [], t.data.list = [],
      t.setData({
        tab: a ? a.currentTarget.dataset.tab : t.data.tab,

      })
    } else {//精选
      // this.getQuestionList('quality');
 wx.showToast({
   title: '功能暂未开放',
      icon: "none"
    })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    /**列表数据 */
    app.api._fetch({
      url: '/community/goods/info',
      data: {},
    }).then(function (res) {
      console.info('列表返回' + JSON.stringify(res))
      that.setData({
          cards: res.data.cards,
          subjects:res.data.subjects,
        credits: res.data.credits,
        totalCredits: res.data.totalCredits
      });
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
    console.info('ioenid'+getApp().globalData.wxOpenid);
    return {

      title: 'Apollo开发者社区',

      desc: '加入全球最大自动驾驶社区，一起改变未来交通',

      path: '/pages/personal/login?inviteOpenid=' + getApp().globalData.wxOpenid

    }

  }
})