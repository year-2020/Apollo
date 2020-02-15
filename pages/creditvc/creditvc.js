// pages/creditvc/creditvc.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ico:'',
    newbieTask: '', 
    dailyTask:'',
    records:'',
    credits:'',
    todayCredits:'',
    flag: true,
    checkin:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  showMask: function () {
    const that = this;
    app.api._fetch({
      url: '/community/creditTask/checkin',
      method: 'post'
    }).then(function (res) {
      wx.showToast({
        title: `${res.data.msg}`,
        icon: 'none'
      })
      if (res.data.code == 500) {

      } else {
        that.setData({ flag: false })
        console.log('/community/creditTask/checkin')
        console.info(res)
        setTimeout(function () {
          that.requestCredit();
        }, 1000) //延迟时间 这里是1秒

      }
     

    }).catch(function (error) {
      console.log(error);
    });

  },
  closeMask: function () {
    this.setData({ flag: true })
  },

/**积分商城 */
toJFshop:function(){
  wx.navigateTo({
    url: '/pages/index/creditstore',
  })
},
/** 去做任务升级啊 */
  todoTask:function(e){
    console.info(e.currentTarget.dataset.id);
    if (e.currentTarget.dataset.id == 10){
      wx.navigateTo({
        url: '/pages/publish/publish',
      })
    } if (e.currentTarget.dataset.id ==4) {
      wx.navigateTo({
        url: '/pages/personal/mybusinesscard',
      })
    } if (e.currentTarget.dataset.id == 9) {//进阶开发
      wx.navigateTo({
        url: '/pages/index/advanceddev',
      })
    } if (e.currentTarget.dataset.id == 1) {//问答专题页面
      wx.switchTab({
        url: '/pages/findvc/findvc',
      })
    } if (e.currentTarget.dataset.id == 2) {//积分商城
      wx.navigateTo({
        url: '/pages/creditvc/exchangevc',
      })
    } if (e.currentTarget.dataset.id == 3) {//跳到首页
      wx.switchTab({
        url: '/pages/index/index',
      })
    } if (e.currentTarget.dataset.id == 7) {//签到挑战
      wx.showToast({
        title: '请点击上方签到按钮完成',
        icon:'none'
      })
    } if (e.currentTarget.dataset.id == 5) {//去反馈
      wx.navigateTo({
        url: '/pages/personalPackage/advicevc',
      })
    }
    if (e.currentTarget.dataset.id == 12) {//去测评页面
      wx.navigateTo({
        url: '/pages/index/skilltest',
      })
    } if (e.currentTarget.dataset.id == 11) {//收藏文章
      wx.switchTab({
        url: '/pages/index/index',
      })
    } if (e.currentTarget.dataset.id == 6) {//分享
      this.onShareAppMessage();//open-type="{{item.taskId==6?'share':''}}"
    }
   
  },
  requestCredit:function(){
    const that = this;
    app.api._fetch({
      url: '/community/creditTask/info',
      data: {},
    }).then(function (res) {
      console.info('积分数据返回' + JSON.stringify(res.data))
      that.setData({
        ico: res.data.wxAvatar,
        newbieTask: res.data.newbieTask,
        dailyTask: res.data.dailyTask,
        records: res.data.records,
        todayCredits: res.data.todayCredits,
        credits: res.data.credits,
        checkin: res.data.checkin
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
    const that = this;
    that.requestCredit();
    
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
        const that = this;

     app.api._fetch({
      url: '/user/invite',
      method: 'get'
    }).then(function (res) {
      
      console.info(res)
    }).catch(function (error) {
      console.log(error);
    });
    return {

      title: 'Apollo开发者社区',

      desc: '加入全球最大自动驾驶社区，一起改变未来交通',

      path: '/pages/personal/login?inviteOpenid=' + getApp().globalData.wxOpenid,
       success: function (res) {
       // 转发成功
       console.log(res);
       console.log("转发成功:" + JSON.stringify(res));
     },
     fail: function (res) {
       // 转发失败
       console.log("转发失败:" + JSON.stringify(res));
     }

    }
  }
})