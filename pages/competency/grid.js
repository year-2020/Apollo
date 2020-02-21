//logs.js
// var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    mySortInfo: {},
    rows: [],
    title: '能力评测'
  },
  beginAnswer: function () {
    wx.navigateTo({
      url: './answer',
    })
  },
  openExamBank: function () {
    app.api._fetch({
      url: '/community/meExamBank/list',
      data: {},
      method: 'post'
    }).then((res) => {
      console.info('我的题库：' + JSON.stringify(res.data))
      app.globalData.myExamBankList = res.data.rows
      if (app.globalData.myExamBankList.length == 0) {
        wx.showModal({
          title: '提示',
          content: '暂无错题',
          showCancel: false,
          success: function (res) {
            console.log("确定")
          }
        })
      } else {
        wx.navigateTo({
          url: './myExamBank',
        })
      }
    }).catch((error) => {
      console.log(error);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    /**列表数据 */
    app.api._fetch({
      url: '/community/examCharts/list',
      data: {},
      method: 'post'
    }).then(function (res) {
      console.info('列表返回' + JSON.stringify(res))
      that.setData({
        rows: res.data.rows
      });
    }).catch(function (error) {
      console.log(error);
    });
  },


  //用户转发
  onShareAppMessage: function () {
    // return {
    //   title: '你的好友' + app.globalData.userInfo.nickName + '邀你吃月饼',
    //   path: '/pages/logs?id=' + app.globalData.userInfo.id
    // }
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
  }
})