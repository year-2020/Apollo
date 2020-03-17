// pages/personal/login.js
const api = require('../../utils/api.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authorization: !1,
    roles :[],

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    getApp().globalData.inviteOpenid = options.inviteOpenid;
    console.info('login页面的' + options.inviteOpenid);
    // 登录
    wx.login({
      success: res => {
    
        api._fetch({
          url: '/wxAuth/authorization/login',// wxc8ce46632dc823f6
          data: { appid: 'wx439876bd3be664f1', code: res.code, inviteOpenid: getApp().globalData.inviteOpenid},
          method: 'post'
        }).then(function (res) {
          console.info('login-callback')
          console.log(' 登录的返回' + JSON.stringify(res));
        if(res&&res.data.data){
          wx.setStorageSync('jid', res.data.data.sessionId)
        }
          getApp().globalData.sessionId = res.data.data.sessionId;
          getApp().globalData.wxOpenid = res.data.data.wxOpenid;
          wx.setStorage({
            key: "loginres",
            data: res.data.data
          })
        }).catch(function (error) {
          console.info('login-error')
          console.log(error);
        });

      }
    })


  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log(e)
      this.authorization = 1;
      if (e.detail.userInfo) {
        //用户按了允许授权按钮
        var that = this;
        wx.setStorage({
          key: "userInfo",
          data: e.detail.userInfo
        }),
        app.globalData.userInfo = e.detail.userInfo;
        var loginres = wx.getStorageSync("loginres"); 
        if (loginres.roles !=null){
          var roles = []
          for (let value of loginres.roles) {
            roles.push(value.roleId)
            console.log(roles)

          }

        }
        
        var params = {
          "wxOpenid": loginres.wxOpenid,
          "userId": loginres.userId,
          "wxNickname": e.detail.userInfo.nickName,
          "wxCity": e.detail.userInfo.city,
          "wxAvatar": e.detail.userInfo.avatarUrl
        }
        console.log('loginres=' + JSON.stringify(loginres))
        console.log('回传的参数=' + JSON.stringify(params))

// 既然已经获取到user了，也授权了，那接下来就是调用system/user
    api._fetch({
      url: '/user/edit',
      data: JSON.stringify(params),
          method: 'post'
        }).then(function (res) {
          console.log('/user')
          console.info(res)
        }).catch(function (error) {
          console.log(error);
        });
        }
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../index/index'//(暂时注释)
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    wx.request({
      url: getApp().globalData.urlPath + '/queryByOpenid',
      data: {
        openid: getApp().globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        getApp().globalData.userInfo = res.data;
      }
    });
  },
  jumpToApLogin:function(){
  wx.navigateTo({
  url: 'aplogin',
})
  },
  jumpToRegister:function(){

wx.navigateTo({
  url: 'registervc',
})
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