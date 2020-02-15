// pages/index/skilltest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: ["https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png"],
    arrowDirection:'up',
    testData1:["感知","规划","控制","高清地图"],
    testData2: ["摄像头", "激光雷达", "黑匣子", "人机交互"],
    testData3: ["高清地图", "仿真平台", "数据平台", "安全"]
  },

/** 弹出尽请期待的 */
  showhope:function(){
    wx.showToast({
      title: '功能暂未开放',
      icon:'none'
    })
  },
  showCollpose: function(){
    let that = this;
    console.info('点击了cell');
    if(that.data.arrowDirection =='up'){
      that.setData({
        arrowDirection: 'down'
      })
    }else{
      that.setData({
        arrowDirection: 'up'
      })
    }
   
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