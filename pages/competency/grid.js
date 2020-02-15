const app = getApp()
Page({
  data: {
    isAdd: false,
    imgUrls: [],
    indicatorDots: false,//是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000,//滑动动画时长
    inputShowed: false,
    circular: true, //是否采用衔接滑动
    title: '能力评测',
    stateList: []
  },
  handleAdd() {
    this.setData({
      isAdd: !this.data.isAdd
    })
  },
  beginAnswer: function () {
    wx.navigateTo({
      url: './answer',
    })
  },
  openWrongQuestion: function () {
    if (app.globalData.wrongAnswerList.length == 0){
      wx.showModal({
        title: '提示',
        content: '暂无错题'
        // success: function (res) {
        //   console.log("确定")
        //   wx.navigateTo({
        //     url: './grid',
        //   })
        // }
      })
    }else{
      wx.navigateTo({
        url: './wrongQuestion',
      })
    }
  },
  learnLib:function(){
    wx.showToast({
      title: '功能暂未开放，敬请期待',
      icon:'none'
    })
  },
  collection:function(){
    wx.showToast({
      title: '功能暂未开放，敬请期待',
      icon: 'none'
    })
  },
  onLoad: function () {
    var that = this;
    this.setData({
      stateList: getApp().globalData.stateList
    }),
    wx.request({
      url: 'https://www.apollodev.club/api/images',
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        that.setData({
          imgUrls:res.data.all_hits
        });
      },
      fail: function (res) { },
    })
  }, 
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
  }
});