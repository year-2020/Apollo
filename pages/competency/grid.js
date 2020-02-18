//logs.js
var util = require('../../utils/util.js')
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
  openWrongQuestion: function () {
    if (app.globalData.wrongAnswerList.length == 0) {
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
        url: './wrongQuestion',
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
      url: '/user/creditRank',
      data: {},
    }).then(function (res) {
      console.info('列表返回' + JSON.stringify(res))
      that.setData({
        rows: res.data.rows
      });
    }).catch(function (error) {
      console.log(error);
    });
    app.globalData.wrongAnswerList = [
      {
        question: '问题一',
        option: {
          A: '问题A',
          B: '问题B',
          C: '问题C',
          D: '问题D'
        },
        answer: 'A',
        yourChose: 'A'
      },
      {
        question: '问题二',
        option: {
          A: '问题A',
          B: '问题B',
          C: '问题C',
          D: '问题D'
        },
        answer: 'B',
        yourChose: 'B'
      },
      {
        question: '问题三',
        option: {
          A: '问题A',
          B: '问题B',
          C: '问题C',
          D: '问题D'
        },
        answer: 'C',
        yourChose: 'C'
      }
    ]
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